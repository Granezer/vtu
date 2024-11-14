import config from "../../config/default";

export async function verifyPaystackPayment(reference: string, productType: "airtime" | "data" | "electricity", payload: any) {
    const verifyResponse = await fetch(`${config.paystackBaseUrl}/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${config.paystackSecretKey}`,
        },
    });

    const verifyResult = await verifyResponse.json();

    if (verifyResponse.status && verifyResult.data.status === 'success') {
        const { amount, phone } = verifyResult.data;
        console.log(`Payment for ${amount / 100} Naira was successful for phone number: ${phone}`);

        await creditUser(productType, payload);

        return {
            success: true,
            message: `Payment verified and user credited for ${productType}.`,
        };
    } else {
        return {
            success: false,
            message: `Payment verification failed for reference: ${reference}`,
        };
    }
}

async function creditUser(productType: "airtime" | "data" | "electricity", payload: any) {
    const creditPayload = {
        request_id: payload.requestId,
        serviceID: payload.serviceId,
        amount: payload.amount,
        phone: payload.phone,
    } as any;

    if (productType === "electricity" || productType === "data") {
        creditPayload["billersCode"] = payload.billersCode;
        creditPayload["variation_code"] = payload.variation_code;
    }

    let apiUrl = "";
    if (productType === "airtime") {
        apiUrl = `${config.baseUrl}/airtime/credit`;
    } else if (productType === "data") {
        apiUrl = `${config.baseUrl}/data/credit`;
    } else if (productType === "electricity") {
        apiUrl = `${config.baseUrl}/electricity/credit`;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "api-key": config.vtuApiKey,
            "secret-key": config.vtuSecretKey,
        },
        body: JSON.stringify(creditPayload),
    });

    const result = await response.json();
    console.log(`Credited ${productType} response: `, result);
}
