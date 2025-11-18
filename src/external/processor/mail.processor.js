import { appName, fromEmail, InternalEmailSales, InternalEmailSupport } from "../../../config/env.config.js";
import { adminTemplate, userTemplate } from "../../../templates/mail.template.js";

export function prepareAdminMail(data) {
    const template = adminTemplate(data);

    const adminRecipients = [
        InternalEmailSupport,
        InternalEmailSales,
        fromEmail
    ].filter(Boolean).join(",");

    return {
        from: `"${appName}" <${fromEmail}>`,
        to: adminRecipients,
        subject: template.subject,
        text: template.text,
        html: template.html,
    };
}

export function prepareUserMail(data) {
    const template = userTemplate(data);

    return {
        from: `"${appName}" <${fromEmail}>`,
        to: data.email,
        subject: template.subject,
        text: template.text,
        html: template.html,
    };
}
