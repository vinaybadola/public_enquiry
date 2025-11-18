import { appName } from "../config/env.config.js";

export function adminTemplate({ name, email, mobile, city, serviceType, supportType }) {
    return {
        subject: `NEW ENQUIRY FROM : ${name}`,
        text: `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        City: ${city}
        Service Type: ${serviceType}
        Support Type: ${supportType}
        `,
        html: `
        <p>You received a message from <strong>${name}</strong> (<a href="mailto:${email}">${email}</a>):</p>
        <p>Mobile: ${mobile}</p>
        <p>City: ${city}</p>
        <p>Service Type: ${serviceType}</p>
        <p>Support Type: ${supportType}</p>
        <br/>
        <p>Regards,<br/>${appName} Team</p>
        `,
    };
}

export function userTemplate({ name }) {
    return {
        subject: "Thank you for connecting with us!",
        text: `
        Hi ${name},
        
        Thank you for reaching out to us. We have received your inquiry, and our team will get back to you shortly.
        In the meantime , you can browse our website for more information.

        Best regards,
        ${appName} Team

        `,
        html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for reaching out to us. We have received your inquiry, and our team will get back to you shortly.</p>
        <p>In the meantime , you can browse our website for more information.</p>
        <p>Best regards,<br/>${appName} Team</p>
        `,
    };
}