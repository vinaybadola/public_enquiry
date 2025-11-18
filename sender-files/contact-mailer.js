import nodemailer from 'nodemailer';
const contactMail = async ({ name, email, mobile, type, subject, usermessage }) => {

  // Configure the email transporter using Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT, // Secure port for Office365
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let recipientEmail;


  if (type === "Technical Support") {
    recipientEmail = process.env.RECIPIENT_EMAIL_1
  } else {
    recipientEmail = process.env.RECIPIENT_EMAIL_2
  }

  const adminMailOptions = {
    from: `"${process.env.APP_NAME}" <${process.env.FROM_EMAIL}>`,
    to: recipientEmail,
    subject: `New Contact: ${name} - ${subject}`,
    text: `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Type: ${type}
        Subject: ${subject}
        Message: ${usermessage}
      `,
    html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${usermessage}</p>
      `,
  };

  // Send admin notification email
  await transporter.sendMail(adminMailOptions);

  // Email content for user
  const userMailOptions = {
    from: `"${process.env.APP_NAME}" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: 'Thank you for contacting us!',
    text: `
        Hi ${name},
        
        Thank you for reaching out to us. We have received your inquiry:
        
        Subject: ${subject}
        Message: ${usermessage}
        
        We will get back to you shortly.
        
        Best regards,
        ${process.env.APP_NAME} Team
      `,
    html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for reaching out to us. We have received your inquiry:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${usermessage}</p>
        <p>We will get back to you shortly.</p>
        <p>Best regards,<br/>${process.env.APP_NAME} Team</p>
      `,
  };

  // Send acknowledgment email to user
  await transporter.sendMail(userMailOptions);
}

export default contactMail;