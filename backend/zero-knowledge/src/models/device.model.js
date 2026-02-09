const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deviceName: {
        type: String,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    },
    os: {
        type: String,
    },
    browser: {
        type: String,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    ipAddress: {
        type: String,
    }
}, { timestamps: true });

// Ensure a user cannot have two devices with the same ID, 
// but different users can have devices with common IDs (e.g. for testing)
deviceSchema.index({ userId: 1, deviceId: 1 }, { unique: true });

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
