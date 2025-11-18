import mongoose from 'mongoose';

//TODO:fix model name  after successful deployments

const customerDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String, required: true },
    serviceType: { type: String, required: true },
    supportType: { type: String, required: true },
}, { timestamps: true });

const customerDataModel = mongoose.model('NewConnection', customerDataSchema);

export default customerDataModel;