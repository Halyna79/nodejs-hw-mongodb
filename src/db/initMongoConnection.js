import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DB,
    MONGODB_URL,
} = process.env;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

export const initMongoConnection = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed');
        console.error(error.message);
        process.exit(1);
    }
};