// src/services/auth.service.js
const User = require("../models/user.model");
const Device = require("../models/device.model");

async function verifyLogin(username, proof, deviceInfo = {}) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return null;
    }

    // Zero-knowledge proof verification logic (simplified for sprint)
    if (user.expectedProof !== proof) {
      return null;
    }

    // Record or update device info
    if (deviceInfo.deviceId) {
      await Device.findOneAndUpdate(
        { deviceId: deviceInfo.deviceId, userId: user._id },
        {
          userId: user._id,
          deviceId: deviceInfo.deviceId,
          deviceName: deviceInfo.deviceName || "Unknown Device",
          os: deviceInfo.os,
          browser: deviceInfo.browser,
          ipAddress: deviceInfo.ipAddress,
          lastLogin: new Date()
        },
        { upsert: true, new: true }
      );
    }

    return {
      id: user._id,
      username: user.username,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
}

async function register(username, proof) {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`[REGISTER SERVICE] User already exists: ${username}`);
      return null; // User already exists
    }

    console.log(`[REGISTER SERVICE] Creating new user: ${username}`);
    const newUser = await User.create({
      username,
      expectedProof: proof,
    });
    console.log(`[REGISTER SERVICE] User created successfully: ${username}`);

    return { username: newUser.username };
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
}

module.exports = { verifyLogin, register }; // Exporting async functions

