import AirtimeModel, { AirtimeDocument } from "../models/airtime.model";
import config from "../../config/default";
import log from "../utils/logger";

export async function purchaseAirtimeProduct(input: Omit<AirtimeDocument, 'createdAt'>) {
    let airtime = await AirtimeModel.create({
        ...input,
        status: 'pending',
    });

    const payload = {
        email: 'dejalltime@gmail.com',
        amount: airtime.amount * 100,
        requestId: airtime.requestId,
        serviceId: airtime.serviceId,
        productType: 'airtime',
        reference: airtime.requestId
    };

    const paystackResponse = await fetch(`${config.paystackBaseUrl}/transaction/initialize`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.paystackSecretKey}`,
        },
        body: JSON.stringify(payload),
    });

    const paystackResult = await paystackResponse.json();

    if (paystackResult.status === true) {
        const paymentUrl = paystackResult.data.authorization_url;
        log.info(`Paystack payment URL generated: ${paymentUrl}`);

        return {
            airtime,
            paymentUrl, 
        };
    } else {
        throw new Error('Failed to generate Paystack payment link');
    }
}
