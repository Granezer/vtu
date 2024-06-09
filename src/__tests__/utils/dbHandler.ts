import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const dbConnect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
}

export const dbDisconnect = async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
}