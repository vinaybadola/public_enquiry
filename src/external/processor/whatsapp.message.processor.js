import { whatsappSupportType } from "../../../config/env.config.js";

export function prepareWhatsAppMessage(data) {

    if (data.supportType.toLowerCase() !== whatsappSupportType.toLowerCase()) {
        console.log(`WhatsApp message not prepared. Support Type must be '${whatsappSupportType}'.`);
        return null;
    }

    return {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        city: data.city,
        serviceType: data.serviceType,
        supportType: data.supportType
    };
}
