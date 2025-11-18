import { body } from "express-validator";
import { serviceType, supportType } from "../../constants/support.type.constants.js";

const allowedServiceTypes = Object.values(serviceType).map(v => v.toLowerCase());
const allowedSupportTypes = Object.values(supportType).map(v => v.toLowerCase());

export const validateCustomerData = [
    body("name")
        .isString().withMessage("Name must be a string")
        .notEmpty().withMessage("Name is required"),

    body("email")
        .isEmail().withMessage("Invalid email format")
        .notEmpty().withMessage("Email is required"),

    body("mobile")
        .isString().withMessage("Mobile must be a string")
        .matches(/^[6-9]\d{9}$/).withMessage("Mobile number must be 10 digits and start with a digit between 6 and 9")
        .notEmpty().withMessage("Mobile is required"),

    body("city")
        .isString().withMessage("City must be a string")
        .notEmpty().withMessage("City is required"),

    body("serviceType")
        .notEmpty().withMessage("Service type is required")
        .custom((value) => {
            if (!value) return false;
            return allowedServiceTypes.includes(value.toLowerCase());
        })
        .withMessage(`Service type must be one of: ${Object.values(serviceType).join(", ")}`),

    body("supportType")
        .notEmpty().withMessage("Support type is required")
        .custom((value) => {
            if (!value) return false;
            return allowedSupportTypes.includes(value.toLowerCase());
        })
        .withMessage(`Support type must be one of: ${Object.values(supportType).join(", ")}`),
];
