import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    city: String,
    email: String,
    name: String,
    mobile: Number,
    message: String,
}, { timestamps: true });

const PlanModel = mongoose.model('Plan', planSchema);

export default PlanModel;