import AirtimeModel, { AirtimeDocument } from "../models/airtime.model";
import config from "../../config/default";
import log from "../utils/logger";

export async function purchaseAirtimeProduct(input: Omit<AirtimeDocument, 'createdAt'>){

    let airtime = await AirtimeModel.create(input);

    const payload = {
        request_id: airtime.requestId,
        serviceID: airtime.serviceId,
        amount: airtime.amount,
        phone: airtime.phoneNumber
    }

    const response = await fetch('https://sandbox.vtpass.com/api/pay', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "api-key": config.vtuApiKey,
            "secret-key": config.vtuSecretKey
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json();
    log.info(result);

    if(response.status === 200){
        return airtime;
    } else {
        throw new Error(response.statusText);
    }
}