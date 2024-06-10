import { createUserPayload, createUserReturnPayload, sessionPayload } from "./utils/fixtures"
import * as UserService from "../services/user.service"
import * as SessionService from "../services/session.service"
import supertest from "supertest"
import createServer from "../utils/server"
import { createUserSessionHandler } from "../controllers/session.controller"

const app = createServer();

describe('user', () => {
    describe('user registration', () => {
        describe('given the username and password', () => { 
            it('should return the user payload', async () => {
                const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                // @ts-ignore
                .mockReturnValueOnce(createUserReturnPayload);

                const { statusCode, body } = await supertest(app).post("/api/users")
                .send(createUserPayload);

                expect(statusCode).toBe(200);
                expect(body).toEqual(createUserReturnPayload);

                expect(createUserServiceMock).toHaveBeenCalledWith(createUserPayload);
            })
         })

         describe('given the user service throws an error', () => { 
            it('should return error 409', async () => {
                const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                // @ts-ignore
                .mockRejectedValueOnce("Oh no!");

                const { statusCode } = await supertest(app).post("/api/users")
                .send(createUserPayload);

                expect(statusCode).toBe(409);

                expect(createUserServiceMock).toHaveBeenCalled();
            })
         })
    })

    describe('create user session', () => {
        describe('given the username and password', () => {
            it('should return a signed access and refresh tokens', async () => {

                jest.spyOn(UserService, 'validatePassword')
                // @ts-ignore
                .mockReturnValue(createUserReturnPayload);

                jest.spyOn(SessionService, 'createSession')
                // @ts-ignore
                .mockReturnValue(sessionPayload);

                const req = {
                    get: () => {
                        return 'user agent'
                    },
                    body: {
                        "email": "dejioaoo@gmail.com",
                        "password": "pass123"
                    }
                }

                const send = jest.fn();

                const res = {
                    send
                }

                // @ts-ignore
                await createUserSessionHandler(req, res);

                expect(send).toHaveBeenCalledWith({
                    accessToken: expect.any(String), 
                    refreshToken: expect.any(String)
                })
            })
        })
    })
})