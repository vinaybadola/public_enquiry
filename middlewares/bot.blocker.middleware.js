import { captchaSecretKey,botBlockerEnable,verificationUrl} from "../config/env.config.js";
import { errorResponseHandler } from "../helpers/response.handler.js";

export async function botBlocker(req, res, next) {
    const token = req.body.captchaToken;

    if(!botBlockerEnable) {
        console.log("Bot blocker is disabled. Skipping captcha verification.");
        return next();
    }

    if (!token) return errorResponseHandler(res, "captcha token missing", 400);

    try {
        const response = await fetch(
            verificationUrl,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    secret: captchaSecretKey,
                    response: token,
                    remoteip: req.ip,
                }),
            }
        );

        const result = await response.json();

        if (!result.success) return errorResponseHandler(res, "captcha verification failed", 400, "captcha-failed");

        if (result.score !== undefined && result.score < 0.5) {
            return errorResponseHandler(res, "captcha failed (low score)", 403, "captcha-low-score");
        }

        next();
    } catch (err) {
        console.error("captcha verification error:", err);
        return errorResponseHandler(res, "captcha verification failed internally", 500, "captcha-internal-error");
    }
}
