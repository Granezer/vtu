import supertest from "supertest"
import createServer from "../utils/server"
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { signJwt } from "../utils/jwt";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const purchaseAirtimePayload = {
    "user": userId,
    "serviceId": "airtel",
    "amount": 100,
    "phoneNumber": "08011111111",
}

const userPayload = {
    "user": userId,
    "email": "dejalltime@gmail.com",
    "username": "dej"
}

describe('airtime', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
    
        await mongoose.connect(mongoServer.getUri());
      });
    
      afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
      });

    describe('buy airtime route', () => {
        describe('given the user is not logged in', () => {
            it('should return a 403', async () => {
                const { statusCode } = await supertest(app)
                    .post('/api/airtime');

                expect(statusCode).toBe(403);
            })
        })

        describe('given the user is logged in', () => {
            it('should purchase airtime successfull and returns 200', async () => {
                const jwt = signJwt(userPayload);
                
                const { body, statusCode } = await supertest(app)
                    .post('/api/airtime')
                    .set('Authorization', `Bearer ${jwt}`)
                    .send(purchaseAirtimePayload)

                expect(statusCode).toBe(200);

                expect(body).toHaveProperty('_id')
            })
        })
    })
})