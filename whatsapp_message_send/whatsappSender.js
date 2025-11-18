const sendWhatsAppMessage = async (name, email, mobile, city, serviceType, supportType)=> {
    try {
        const allowedType = (process.env.WHATSAPP_SUPPORT_TYPE || "new connection").toLowerCase();

        // Ensure only allowed support type messages are sent
        if (supportType.toLowerCase() !== allowedType) {
            console.log(`WhatsApp message not sent. Support Type must be '${allowedType}'.`);
            return;
        }

        const messageData = {
            name,
            email,
            mobile,
            city,
            serviceType,
            supportType
        };

        const whatsappApiUrl = process.env.NEXT_PUBLIC_WHATSAPP_API;
        const type = process.env.WHATSAPP_TYPE || "gtel-website-inquiry";
        const source = process.env.WHATSAPP_SOURCE || "gtel-website";

        const whatsappResponse = await fetch(whatsappApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: messageData,
                source,
                type
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

export default sendWhatsAppMessage;
