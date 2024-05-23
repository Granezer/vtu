import { TypeOf, number, object, string } from 'zod';

export const createDataSchema = object({
    body: object({
        serviceId: string({
            required_error: "Service Provider Id is required"
        }),
        amount: number({
            required_error: "Top up amount is required"
        }),
        phoneNumber: string({
            required_error: "Phone number is required"
        }).min(10, "Invalid Phone Number"),
        billersCode: string({
            required_error: "Billers Code is required. Billers Codde is the phone number you wish to make the Subscription payment on"
        }).min(10, "Invalid Phone Number"),
        variationCode: string({
            required_error: "Variation Code is required."
        })
    })
})


export type DataPurchaseInput = TypeOf<typeof createDataSchema>;