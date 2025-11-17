import mongoose from 'mongoose';

const connectDB = async (dbName = 'gtel') => {
  try {
    const MONGO_URI = process.env.MONGO_URI
    
    const conn = await mongoose.connect(MONGO_URI, {
     
    });
    console.log(`MongoDB Connected: ${conn.connection.host}, DB: ${dbName}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;