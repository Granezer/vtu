import { Request, Response } from "express";
import { ElectricityDocument } from "models/electricity.model";
import { ElectricityPurchaseInput, VerifyMeterInput } from "schema/electricity.schema";
import { purchaseElectricityProduct, verifyMeter } from "../services/electricity.service";

export async function buyElectricityProductHandler(req: Request<{}, {}, ElectricityPurchaseInput['body']>, res: Response){
    const userId = res.locals.user._id;

    const body = req.body;

    const electricity = await purchaseElectricityProduct({ ...body, user: userId } as Omit<ElectricityDocument, 'createdAt'>);

    return res.send(electricity);
};

export async function verifyMeterHandler(req: Request<{}, {}, VerifyMeterInput['body']>, res: Response){
    const userId = res.locals.user._id;

    const body = req.body;

    const electricity = await verifyMeter({ ...body, user: userId });

    return res.send(electricity);
};