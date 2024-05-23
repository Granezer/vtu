import mongoose from "mongoose";
import uniqid from 'uniqid'
import dayjs from "dayjs";
import { UserDocument } from "./user.model";

export interface ElectricityDocument extends mongoose.Document {
    user: UserDocument["_id"]
    serviceId: string,
    amount: number,
    billersCode: string,
    phoneNumber: string,
    variationCode: string,
    createdAt: Date
}

const electricitySchema = new mongoose.Schema(
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
            type: String,
            required: true
        },
        billersCode: {
            type: String,
            required: true
        },
        variationCode: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

const ElectricityModel = mongoose.model("Electricity", electricitySchema);

export default ElectricityModel;