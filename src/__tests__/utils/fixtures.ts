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

export const createUserPayload = {
    "email": "dejioapo@gmail.com",
    "username": "reeleoko",
    "password": "pass123"
}

export const createUserReturnPayload = {
    "_id": "6666396f1022ad8db4b471b1",
    "email": "dejioapo@gmail.com",
    "username": "reeleoko",
}

export const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.28.4",
    createdAt: new Date("2021-09-30T13:31:07.674Z"),
    updatedAt: new Date("2021-09-30T13:31:07.674Z"),
    __v: 0,
  };