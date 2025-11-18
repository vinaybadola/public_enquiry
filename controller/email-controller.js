import NewConnection from '../model/email-model.js';
// import sendWhatsAppMessage from '../whatsapp_message_send/whatsappSender.js';
import sendEmail from '../sender-files/email-mailer.js';

const emailtController = async (req, res) => {
    try {

        const { name, email, mobile, city, serviceType, supportType } = req.body;

        // Save form data to the database
        const newSubmission = new NewConnection({
            name,
            email,
            mobile,
            city,
            serviceType,
            supportType,
        });
        await newSubmission.save("gtel");

        // Send a WhatsApp message
        // await sendWhatsAppMessage({name, email, mobile, city, serviceType, supportType});

        // Send a email message
        await sendEmail({name, email, mobile, city, serviceType, supportType});

        return res.status(200).json({ message: 'Emails, group message, and individual WhatsApp message sent successfully!' });

    } catch (error) {
        console.error(`Error occurred : ${error.message}`);
        return  res.status(500).json({ message: 'Failed to send email or WhatsApp messages.', error: `error : ${error}` })
    }
}

export default emailtController;