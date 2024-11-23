import ElectricityModel, { ElectricityDocument } from "../models/electricity.model";
import config from "../../config/default";
import { VerifyMeterInput } from "schema/electricity.schema";
import log from "../utils/logger";

export async function purchaseElectricityProduct(input: Omit<ElectricityDocument, 'createdAt'>){

    let electricity = await ElectricityModel.create(input);

    const payload = {
      email: "panbux@hotmail.com",
      request_id: electricity.requestId,
      serviceID: electricity.serviceId,
      amount: electricity.amount * 100,
      phone: electricity.phoneNumber,
      billersCode: electricity.billersCode,
      variation_code: electricity.variationCode,
      reference: electricity.requestId,
    };

     const paystackResponse = await fetch(
       `${config.paystackBaseUrl}/transaction/initialize`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${config.paystackSecretKey}`,
         },
         body: JSON.stringify(payload),
       }
     );

     const paystackResult = await paystackResponse.json();

     if (paystackResult.status === true) {
       const paymentUrl = paystackResult.data.authorization_url;
       log.info(`Paystack payment URL generated: ${paymentUrl}`);

       return {
         electricity,
         paymentUrl,
       };
     } else {
       throw new Error("Failed to generate Paystack payment link");
     }
}

export async function verifyMeter(meterDetails: any){
    
    const payload = {
        serviceID: meterDetails.serviceId,
        billersCode: meterDetails.billersCode,
        type: meterDetails.type
    }

    const response = await fetch(`${config.baseUrl}/merchant-verify`, {
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