import mongoErrorHandler from "../../helpers/mongo.error.handler.js";
import { successResponseHandler } from "../../helpers/response.handler.js";
import EmailService from "../external/service/email.service.js";
import Contact from "../models/contact.model.js";
import customerDataModel from "../models/customer.data.model.js";
import WhatsAppService from "../external/service/whatsapp.service.js";

export default class CustomerDataController {

    static async submitCustomerData(req, res) {
        try {
            const { name, email, mobile,city,serviceType,supportType } = req.body;

            const newSubmission = new customerDataModel({
                name,
                email,
                mobile,
                city,
                serviceType,
                supportType,
            });

            await newSubmission.save();

            WhatsAppService.sendMessage({
                name,
                email,
                mobile,
                city,
                serviceType,
                supportType
            }).catch(err => console.error("Async WhatsApp Error:", err));

            EmailService.sendMailWithTemplate({
                name,
                email,
                mobile,
                city,
                serviceType,
                supportType
            }).catch(err => console.error("Async Email Error:", err));

            return successResponseHandler(res, "Customer data submitted successfully", 201);
        }
        catch (err) {
            console.error("Error processing the request:", err);
            return mongoErrorHandler(err, res);
        }
    }

    static async submitCustomerDataWithUserMessage(req, res) {
        try {
            const { name, email, mobile, type, subject, usermessage } = req.body;

            const newSubmission = new Contact({
                name,
                email,
                mobile,
                type,
                subject,
                usermessage,
            });

            await newSubmission.save();

            return successResponseHandler(res, "Customer data with user message submitted successfully", 201);
        } catch (error) {
            console.error("Error processing the request:", error);
            return mongoErrorHandler(error, res);
        }

    }

}