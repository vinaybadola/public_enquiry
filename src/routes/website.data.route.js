import express from "express";
const router = express.Router();

import WebsiteDataController from "../controllers/website.data.controller.js";

router.post("/plan-request", WebsiteDataController.submitPlanRequest);
router.post("/geofeed-data", WebsiteDataController.submitGeoFeedData);
router.get("/geofeed-data", WebsiteDataController.fetchAllGeoFeedData);

export default router;