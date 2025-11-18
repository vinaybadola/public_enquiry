import { errorResponseHandler } from "./response.handler.js"

/**
 * Centralised Mongo / Mongoose error helper
 *
 * @param {Error}   err  – the caught error (usually from a try/catch)
 * @param {object}  res  – express response object
 * @param {object} [options] – optional overrides
 */
export default function mongoErrorHandler(err, res, options = {}) {
    const {
        duplicateStatus = 409,
        genericStatus = 500,
    } = options;


    if (err?.code === 11000) {
        let keyValue = err.keyValue;

        // If bulk write, keyValue might be inside writeErrors[0].err
        if (!keyValue && err.writeErrors?.length > 0) {
            keyValue = err.writeErrors[0]?.err?.keyValue;
        }

        const field = keyValue ? Object.keys(keyValue)[0] : "field";
        const msg = keyValue
            ? `Duplicate ${field}: "${keyValue[field]}" already exists`
            : "Duplicate key error";

        return errorResponseHandler(res, msg, duplicateStatus);
    }

    if (err instanceof Error) {
        return errorResponseHandler(res, err.message, 400);
    }

    return errorResponseHandler(res, "Internal Server Error", genericStatus);
}