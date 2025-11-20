import { captchaSecretKey, botBlockerEnable, verificationUrl } from "../config/env.config.js";
import { errorResponseHandler } from "../helpers/response.handler.js";

export async function botBlocker(req, res, next) {
    const token = req.body.captchaToken;

    if (!botBlockerEnable) {
        console.log("Bot blocker is disabled. Skipping captcha verification.");
        return next();
    }

    if (!token) return errorResponseHandler(res, "captcha token missing", 400);

    try {
        const params = new URLSearchParams();
        params.append("secret", captchaSecretKey);
        params.append("response", token);
        params.append("remoteip", req.ip);

        const response = await fetch(verificationUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        const result = await response.json();
        console.log("Captcha verification result:", result);

        if (!result.success) return errorResponseHandler(res, "captcha verification failed", 400, "captcha-failed");

        if (typeof result.score === "number" && result.score < 0.5) {
            return errorResponseHandler(res, "captcha failed (low score)", 403, "captcha-low-score");
        }
        if (result.score !== undefined && result.score < 0.5) {
            return errorResponseHandler(res, "captcha failed (low score)", 403, "captcha-low-score");
        }

        next();
    } catch (err) {
        console.error("captcha verification error:", err);
        return errorResponseHandler(res, "captcha verification failed internally", 500, "captcha-internal-error");
    }
}
