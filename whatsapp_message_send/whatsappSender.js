
const sendWhatsAppMessage = async (name, email, mobile, city, serviceType, supportType)=> {
    try {
        // Ensure only "New Connection" messages are sent
        if (supportType.toLowerCase() !== "new connection") {
            console.log("WhatsApp message not sent. Support Type is not 'new connection'.");
            return;
        }

        // Message content as an object (correct format)
        const messageData = {
            name: name,
            email: email,
            mobile: mobile,
            city: city,
            serviceType: serviceType,
            supportType: supportType
        };

        // API URL & Credentials
        const whatsappApiUrl = process.env.NEXT_PUBLIC_WHATSAPP_API;
        const type = "gtel-website-inquiry";
        const source = "gtel-website";

        // API Request
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

        // Error Handling
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