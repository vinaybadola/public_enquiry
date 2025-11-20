import { environment, whatsappApiUrl, whatsappSupportType, whatsappType } from "../../../config/env.config.js";
import { prepareWhatsAppMessage } from "../processor/whatsapp.message.processor.js";

export default class WhatsAppService {

    static async sendMessage(messageData) {
        try {
            const prepareMessageData = prepareWhatsAppMessage(messageData)

            if (!prepareMessageData) {
                console.log("WhatsApp message not sent due to unsupported support type.");
                return;
            }

            if(environment === 'DEVELOPMENT') {
                console.log("Sending WhatsApp Message...", whatsappApiUrl, whatsappType, whatsappSupportType);
                console.log("Prepared WhatsApp Message Data:", prepareMessageData);
                console.log("WhatsApp message not sent in DEVELOPMENT environment.");
                return;
            }

            const whatsappResponse = await fetch(whatsappApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: prepareMessageData,
                    source: whatsappType,
                    type: whatsappType
                }),
            });

            if (!whatsappResponse.ok) {
                const errorDetails = await whatsappResponse.text();
                console.error("WhatsApp API Error:", errorDetails);
                throw new Error(`Failed to send WhatsApp message: ${errorDetails}`);
            }

            console.log("WhatsApp Message Sent Successfully");

        } catch (error) {
            console.error("Error sending WhatsApp message:", error.message);

        }
    }
}