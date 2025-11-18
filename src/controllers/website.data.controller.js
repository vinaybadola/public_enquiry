import PlanModel from "../models/plan.request.model.js";
import mongoErrorHandler from "../../helpers/mongo.error.handler.js";
import { successResponseHandler } from "../../helpers/response.handler.js";
import GeoFeedData from "../models/geofeed.model.js";

export default class WebsiteDataController {

    static async submitPlanRequest(req, res) {
        try {
            const { name, email, mobile, city, message } = req.body;

            const newPlanRequest = new PlanModel({
                name,
                email,
                mobile,
                city,
                message,
            });

            await newPlanRequest.save();

            return successResponseHandler(res, "Plan request submitted successfully", 201);
        } catch (err) {
            console.error("Error processing the request:", err);
            return mongoErrorHandler(err, res);
        }
    }

    static async submitGeoFeedData(req, res) {
        try {
            const { prefix, country_code, region_code, city, postal } = req.body;
            const newGeoFeedData = new GeoFeedData({
                prefix,
                country_code,
                region_code,
                city,
                postal
            });
            await newGeoFeedData.save();
            return successResponseHandler(res, "GeoFeed data submitted successfully", 201, newGeoFeedData);
        }
        catch (err) {
            console.error("Error processing the request:", err);
            return mongoErrorHandler(err, res);
        }
    }

    static async fetchAllGeoFeedData(req, res) {
        try {
            const { search } = req.query;
            let query = {};

            if (search) {
                query.ipPrefix = { $regex: search, $options: 'i' };
            }

            const records = await GeoFeedData.find(query).sort({ createdAt: -1 });

            const transformedData = records.map(record => ({
                id: record._id.toString(),
                prefix: record.ipPrefix,
                country_code: record.countryCode,
                region_code: record.regionCode,
                city: record.city,
                postal: record.postalCode
            }));

            return successResponseHandler(res, "GeoFeed data fetched successfully", 200, transformedData);
        }
        catch (err) {
            console.error("Error processing the request:", err);
            return mongoErrorHandler(err, res);
        }
    }
}