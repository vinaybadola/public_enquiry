import { turnstileToken } from "../config/env.config.js";
import { errorResponseHandler } from "../helpers/response.handler.js";

export async function botBlocker(req, res, next) {
    const token = req.body.turnstileToken;

    if (!token) return errorResponseHandler(res, "Turnstile token missing", 400);

    try {

        const response = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    secret: process.env.TURNSTILE_SECRET_KEY,
                    response: token,
                    remoteip: req.ip,
                }),
            }
        );

        const result = await response.json();

        if (!result.success) return errorResponseHandler(res, "Turnstile verification failed", 400, "Turnstile-failed");

        if (result.score !== undefined && result.score < 0.5) {
            return errorResponseHandler(res, "Turnstile failed (low score)", 403, "Turnstile-low-score");
        }

        next();
    } catch (err) {
        console.error("Turnstile verification error:", err);
        return errorResponseHandler(res, "Turnstile verification failed internally", 500, "Turnstile-internal-error");
    }
}
