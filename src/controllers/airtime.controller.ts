import { Request, Response } from "express";
import { AirtimeDocument } from "models/airtime.model";
import { AirtimePurchaseInput } from "schema/airtime.schema";
import { purchaseAirtimeProduct } from "../services/airtime.service";

export async function buyAirtimeProductHandler(req: Request<{}, {}, AirtimePurchaseInput['body']>, res: Response){
    try{
        const userId = res.locals.user._id;

        
        const body = req.body;
    
        const airtime = await purchaseAirtimeProduct({ ...body, user: userId } as Omit<AirtimeDocument, 'createdAt'>);
    
        return res.send(airtime);
        
    } catch(e: any) {
        return res.status(503).send(e.message)
    }
};