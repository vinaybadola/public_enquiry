import express from "express";
const router = express.Router();

import customerDataRoutes from "./customer.data.route.js";
import websiteDataRoutes from "./website.data.route.js";

router.use("/customer-data", customerDataRoutes);
router.use("/website-data", websiteDataRoutes);

export default router;