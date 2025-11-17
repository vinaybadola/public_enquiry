import nodemailer from 'nodemailer';

const platformMailer = async (name, email, mobile, city, message) => {
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
    const companyEmail = [process.env.COMPANY_EMAIL];

    const adminMailOptions = {
        from: '"Gigantic" <info@gtel.in>',
        to: companyEmail.join(","),
        subject: `Plan Inquiry: ${name}`,
        text: `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        City: ${city}
        Message: ${message}
      `,
        html: `
        <h3>Plan Inquiry Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send admin notification email
    await transporter.sendMail(adminMailOptions);

    // Email content for user
    const userMailOptions = {
        from: '"Gigantic" <info@gtel.in>',
        to: email, // User's email

        text: `
        Hi ${name},
        
        Thank you for reaching out to us. We have received your inquiry:
        
        
        Message: ${message}
        
        We will get back to you shortly.
        
        Best regards,
        Gigantic Team
      `,
        html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for reaching out to us. We have received your inquiry:</p>
        
        <p><strong>Message:</strong> ${message}</p>
        <p>We will get back to you shortly.</p>
        <p>Best regards,<br/>Gigantic Team</p>
      `,
    };

    // Send acknowledgment email to user
    await transporter.sendMail(userMailOptions);
}

export default platformMailer;