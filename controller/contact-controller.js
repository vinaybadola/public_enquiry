import contactMail from "../mailer/contact-mailer.js";
import Contact from "../model/contact-model.js";

const contactController = async (req, res) => {
    try {
        const { name, email, mobile, type, subject, message } = req.body;

        // Save form data
        const newSubmission = new Contact({
            name,
            email,
            mobile,
            type,
            subject,
            message,
        });

        await newSubmission.save();

        // Send emails
        await contactMail({ name, email, mobile, type, subject, message });

        return res.status(200).json({
            message: "Emails sent successfully!",
            success: true,
            code : newSubmission
        });

    } catch (error) {
        console.error("Error processing the request:", error);

        return res.status(500).json({
            message: "Failed to send email or save data.",
            error: error.message,
            success: false
        });
    }
};

export default contactController;
