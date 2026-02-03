// src/services/auth.service.js
const User = require("../models/user.model");

async function verifyLogin(username, proof) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return null;
    }

    // Zero-knowledge proof verification logic (simplified for sprint)
    console.log(`[LOGIN DEBUG] Username: ${username}`);
    console.log(`[LOGIN DEBUG] Stored Proof:   ${user.expectedProof}`);
    console.log(`[LOGIN DEBUG] Received Proof: ${proof}`);

    if (user.expectedProof !== proof) {
      console.log(`[LOGIN DEBUG] VALIDATION FAILED`);
      return null;
    }

    return {
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

