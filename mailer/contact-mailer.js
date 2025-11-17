import nodemailer from 'nodemailer';
const contactMail = async ({ name, email, mobile, type, subject, message }) => {

    // Configure the email transporter using Nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT, // Secure port for Office365
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // const companyEmail = ["sales@gtel.in", "support@gtel.in"];
    let recipientEmail;


    if (type === "Technical Support") {
        recipientEmail = ["support@gtel.in"]
    } else {
        recipientEmail = ["sales@gtel.in"]
    }

    const adminMailOptions = {
        from: '"Gigantic" <info@gtel.in>',
        to: recipientEmail,
        subject: `New Contact: ${name} - ${subject}`,
        text: `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Type: ${type}
        Subject: ${subject}
        Message: ${message}
      `,
        html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send admin notification email
    await transporter.sendMail(adminMailOptions);

    // Email content for user
    const userMailOptions = {
        from: '"Gigantic" <info@gtel.in>',
        to: email, // User's email
        subject: 'Thank you for contacting us!',
        text: `
        Hi ${name},
        
        Thank you for reaching out to us. We have received your inquiry:
        
        Subject: ${subject}
        Message: ${message}
        
        We will get back to you shortly.
        
        Best regards,
        Gigantic Team
      `,
        html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for reaching out to us. We have received your inquiry:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>We will get back to you shortly.</p>
        <p>Best regards,<br/>Gigantic Team</p>
      `,
    };

    // Send acknowledgment email to user
    await transporter.sendMail(userMailOptions);
}

export default contactMail;