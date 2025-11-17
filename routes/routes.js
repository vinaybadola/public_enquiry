import express from "express";
import contactController from "../controller/contact-controller.js";
import emailtController from "../controller/email-controller.js";
import validate from "../middlewares/validate-middlewares.js";
import { ContactSchema, EmailSchema, platformSchema } from "../validators/validators.js";
import plateformController from "../controller/platform-controller.js";

const router = express.Router();

router.route("/contact").post(validate(ContactSchema), contactController);
router.route("/email").post(validate(EmailSchema), emailtController);
router.route("/platform").post(validate(platformSchema), plateformController);

export default router;