import DataModel, { DataDocument } from "../models/data.model";
import config from "../../config/default";

export async function purchaseDataProduct(input: Omit<DataDocument, 'createdAt'>){

    let data = await DataModel.create(input);

    const payload = {
        request_id: data.requestId,
        serviceID: data.serviceId,
        amount: data.amount,
        phone: data.phoneNumber,
        billersCode: data.billersCode,
        variation_code: data.variationCode
    }

    const response = await fetch(`${config.baseUrl}/pay`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "api-key": config.vtuApiKey,
            "secret-key": config.vtuSecretKey
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json();
    console.log(result);

    if(response.status === 200){
        return result;
    }
}