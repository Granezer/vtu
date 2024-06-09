import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId().toString();

export const purchaseAirtimePayload = {
    "user": userId,
    "serviceId": "airtel",
    "amount": 100,
    "phoneNumber": "08011111111",
}

export const userPayload = {
    "user": userId,
    "email": "dejalltime@gmail.com",
    "username": "dej"
}