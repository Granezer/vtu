import ElectricityModel, { ElectricityDocument } from "../models/electricity.model";
import config from "../../config/default";
import { VerifyMeterInput } from "schema/electricity.schema";

export async function purchaseElectricityProduct(input: Omit<ElectricityDocument, 'createdAt'>){

    let electricity = await ElectricityModel.create(input);

    const payload = {
        request_id: electricity.requestId,
        serviceID: electricity.serviceId,
        amount: electricity.amount,
        phone: electricity.phoneNumber,
        billersCode: electricity.billersCode,
        variation_code: electricity.variationCode
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
    console.log(result);

    if(response.status === 200){
        return result;
    }
}

export async function verifyMeter(meterDetails: any){
    
    const payload = {
        serviceID: meterDetails.serviceId,
        billersCode: meterDetails.billersCode,
        type: meterDetails.type
    }

    const response = await fetch('https://sandbox.vtpass.com/api/merchant-verify', {
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