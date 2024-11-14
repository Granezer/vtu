import { Request, Response } from "express";
import log from "../utils/logger";
import { verifyPaystackPayment } from "../utils/paystack";

export async function paystackWebhook(req: Request, res: Response) {
    try {
        const event = req.body;
        log.info(`Received webhook: ${JSON.stringify(event)}`);

        if (event.event === "charge.success") {
            const reference = event.data.reference;
            const productType = event.data.productType;

            const payload = {
                requestId: event.data.reference,
                serviceId: event.data.serviceID,
                amount: event.data.amount,
                phone: event.data.phone,
            };

            const verificationResult = await verifyPaystackPayment(reference, productType, payload);

            if (verificationResult.success) {
                return res.status(200).json({ message: "Payment verified and processed successfully." });
            } else {
                return res.status(400).json({ message: "Payment verification failed." });
            }
        } else {
            log.warn(`Received non-payment event: ${event.event}`);
            return res.status(400).json({ message: "Non-payment event received." });
        }
    } catch (error: any) {
        log.error(`Error processing Paystack webhook: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
