import DataModel, { DataDocument } from "../models/data.model";
import config from "../../config/default";
import log from "../utils/logger";

export async function purchaseDataProduct(input: Omit<DataDocument, 'createdAt'>){

    let data = await DataModel.create(input);

    const payload = {
        email: 'panbux@hotmail.com',
        request_id: data.requestId,
        reference: data.requestId,
        serviceID: data.serviceId,
        amount: data.amount * 100,
        phone: data.phoneNumber,
        billersCode: data.billersCode,
        variation_code: data.variationCode
    }

    
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
            data,
            paymentUrl, 
        };
    } else {
        throw new Error('Failed to generate Paystack payment link');
    }
}