import { TypeOf, number, object, string } from 'zod';

export const createAirtimeSchema = object({
    body: object({
        serviceId: string({
            required_error: "Service Provider Id is required"
        }),
        amount: number({
            required_error: "Top up amount is required"
        }),
        phoneNumber: number({
            required_error: "Phone number is required"
        }).min(10, "Invalid Phone Number")
    })
})


export type AirtimePurchaseInput = TypeOf<typeof createAirtimeSchema>;