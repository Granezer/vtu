import mongoose from "mongoose";
import uniqid from 'uniqid';
import dayjs from "dayjs";
import { UserDocument } from "./user.model";

export interface AirtimeDocument extends mongoose.Document {
    user: UserDocument["_id"];
    serviceId: string;
    amount: number;
    phoneNumber: string;
    status: "pending" | "successful" | "failed";
    requestId: string;
    createdAt: Date;
    updatedAt: Date;
}

const airtimeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        requestId: {
            type: String,
            required: true,
            unique: true,
            default: () => dayjs().format('YYYYMMDDHHmm') + uniqid(),
        },
        serviceId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "successful", "failed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const AirtimeModel = mongoose.model<AirtimeDocument>("Airtime", airtimeSchema);

export default AirtimeModel;
