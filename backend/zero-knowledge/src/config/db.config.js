const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/zero-knowledge";

const connectDB = async () => {
    try {
        const maskedURI = MONGODB_URI.replace(/:([^:@]+)@/, ":***@");
        console.log(`[DB] Attempting to connect to: ${maskedURI}`);
        await mongoose.connect(MONGODB_URI, {
            maxPoolSize: 10,
            minPoolSize: 2,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`[DB] MongoDB Connected: ${mongoose.connection.host}`);
        console.log(`[DB] Database Name: ${mongoose.connection.name}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
