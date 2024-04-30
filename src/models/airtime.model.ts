import mongoose from "mongoose";
import uniqid from 'uniqid'
import dayjs from "dayjs";
import { UserDocument } from "./user.model";

export interface AirtimeDocument extends mongoose.Document {
    user: UserDocument["_id"]
    serviceId: string,
    amount: number,
    phoneNumber: number,
    createdAt: Date
}

const airtimeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        requestId: {
            type: String,
            required: true,
            unique: true,
            default: () => dayjs().format('YYYYMMDDHHmm') + uniqid()
        },
        serviceId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

const AirtimeModel = mongoose.model<AirtimeDocument>("Airtime", airtimeSchema);

export default AirtimeModel;