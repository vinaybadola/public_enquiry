import express from "express";
const router = express.Router();

import CustomerDataController from "../controllers/customer.data.controller.js";
import { handleValidationErrors } from "../../helpers/response.handler.js";

import { validateCustomerData } from "../validators/validators.js";
import { botBlocker } from "../../middlewares/bot.blocker.middleware.js";

router.post("/", botBlocker, validateCustomerData, handleValidationErrors, CustomerDataController.submitCustomerData);
router.post("/message", CustomerDataController.submitCustomerDataWithUserMessage);

export default router;