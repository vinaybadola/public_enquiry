import { validationResult } from "express-validator";

export const errorResponseHandler = (res, errorMessage, ErrorStatusCode = 400, key = null) => {
    return res.status(ErrorStatusCode).json({ success: false, message: errorMessage, key });
}

export const successResponseHandler = (res, successMessage, statusCode = 200, data, pagination) => {
    return res.status(statusCode).json({ success: true, message: successMessage, data, pagination });
}

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};