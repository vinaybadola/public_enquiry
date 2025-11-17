import platformMailer from '../mailer/platform-mailer.js';
import Plan from '../model/platfrom-mdel.js';

const plateformController = async (req, res) => {
    try {

        const { name, email, mobile, city, message } = req.body;

        // Save form data to the database
        const newSubmission = new Plan({
            name,
            email,
            mobile,
            city,
            message,
        });
        await newSubmission.save();

        //  sendMail call here
        await platformMailer(name, email, mobile, city, message);

        // Respond with success
        return res.status(200).json({ message: 'Emails sent successfully!', code: newSubmission });
    } catch (error) {
        console.error('Error processing the request:', error);

        return new res.status(500).json({ message: 'Failed to send email or save data.' });
    }
}

export default plateformController;