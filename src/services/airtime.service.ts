import AirtimeModel, { AirtimeDocument } from "../models/airtime.model";

export async function purchaseAirtimeProduct(input: Omit<AirtimeDocument, 'createdAt'>){
    return AirtimeModel.create(input);
}