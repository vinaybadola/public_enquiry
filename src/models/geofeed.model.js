import mongoose from 'mongoose';

const GeoFeedSchema = new mongoose.Schema({
    ipPrefix: { type: String, required: true, index: true },
    countryCode: { type: String },
    regionCode: { type: String },
    city: { type: String },
    postalCode: { type: String },
}, { timestamps: true });

const GeoFeedData = mongoose.model('GeoFeed', GeoFeedSchema);

export default GeoFeedData;