const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zero-vault";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
