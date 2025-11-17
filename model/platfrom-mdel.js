import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    city: {type:String},
    email:  {type:String},
    name: {type:String},
    mobile:  {type:String},
    message:  {type:String},
}, { timestamps: true });

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
