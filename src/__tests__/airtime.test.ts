import supertest from "supertest"
import createServer from "../utils/server"

const app = createServer();

describe('airtime', () => {
    describe('buy airtime', () => {
        describe('given the user is not logged in', () => {
            it('should return a 403', async () => {
                const { statusCode } = await supertest(app)
                    .post('/api/airtime');

                expect(statusCode).toBe(403);
            })
        })
    })
})