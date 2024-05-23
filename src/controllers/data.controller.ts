import { Request, Response } from "express";
import { DataDocument } from "models/data.model";
import { DataPurchaseInput } from "schema/data.schema";
import { purchaseDataProduct } from "../services/data.service";

export async function buyDataProductHandler(req: Request<{}, {}, DataPurchaseInput['body']>, res: Response){
    const userId = res.locals.user._id;

    const body = req.body;

    const airtime = await purchaseDataProduct({ ...body, user: userId } as Omit<DataDocument, 'createdAt'>);

    return res.send(airtime);
};