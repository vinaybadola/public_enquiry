import { environment } from "../../../config/env.config.js";
import transporter from "../../../config/mailer.js";
import { prepareAdminMail, prepareUserMail } from "../processor/mail.processor.js";

export default class EmailService {

    static async sendMail(mailOptions) {
        return await transporter.sendMail(mailOptions);
    }

    static async sendMailWithTemplate(data) {
        const adminMail = prepareAdminMail(data);
        const userMail = prepareUserMail(data);

        // if(environment === 'DEVELOPMENT') {
            
        //     console.log("Admin Mail Options:", adminMail);
        //     console.log("User Mail Options:", userMail);
        //     return true;
        // }

        await this.sendMail(adminMail);
        await this.sendMail(userMail);

        return true;
    }
}