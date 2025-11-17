import nodemailer from 'nodemailer';

const sendEmail = async ({ name,email, mobile, city, serviceType, supportType, }) => {

    // Set up email transport using Nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT, // Secure port for Office365
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const type = ["Technical Support", "Billing & Recharge"];
    let recipientEmail;

    // Correctly checking if supportType matches any value in `type`
    if (type.includes(supportType)) {
        recipientEmail = ["support@gtel.in"]
    } else {
        recipientEmail = ["sales@gtel.in"]
    }


    // Send admin notification email
    await transporter.sendMail({
        from: '"Gigantic" <info@gtel.in>',

        to: recipientEmail,
        subject: `Message from ${name} ${serviceType}`,
        text: `You received a message from ${name} (${email}):\n\nMobile: ${mobile}\nCity: ${city}\nService Type: ${serviceType}\nSupport Type: ${supportType}`,
        html: `
        <p>You received a message from <strong>${name}</strong> (<a href="mailto:${email}">${email}</a>):</p>
        <p>Mobile: ${mobile}</p>
        <p>City: ${city}</p>
        <p>Service Type: ${serviceType}</p>
        <p>Support Type: ${supportType}</p>
      `,
    });

    // Send a thank-you email to the user
    await transporter.sendMail({
        from: '"Gigantic" <info@gtel.in>',
        to: email,
        subject: 'Thank you for connecting with us!',
        text: `Hi ${name},\n\nThank you for reaching out to us! We have received your inquiry and will get back to you soon.\n\nBest regards,\nGigantic Team`,
        html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for reaching out to us! We have received your inquiry and will get back to you soon.</p>
        <p>Best regards,<br/>Gigantic Team</p>
      `,
    });
}

export default sendEmail;