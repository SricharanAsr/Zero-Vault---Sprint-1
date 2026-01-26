const express = require("express");
const router = express.Router();
const { verifyLogin, register } = require("../services/auth.service");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, proof } = req.body || {};

    if (!username || !proof) {
      return res.status(400).json({
        error: "Username and proof are required",
        details: "Both username and authentication proof must be provided for registration"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      return res.status(400).json({
        error: "Invalid email format",
        details: "Please provide a valid email address"
      });
    }

    console.log(`[AUTH ROUTE] Register attempt for username: ${username}`);
    const result = await register(username, proof);

    if (!result) {
      return res.status(409).json({
        error: "User already exists",
        details: "An account with this email address is already registered"
      });
    }

    return res.status(201).json({
      message: "Registration successful",
      user: result,
    });
  } catch (error) {
    console.error('[AUTH ERROR]', error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: "An unexpected error occurred during registration"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, proof } = req.body || {};

    // Input validation
    if (!username || !proof) {
      return res.status(400).json({
        error: "Username and proof are required",
      });
    }

    console.log(`[AUTH ROUTE] Login attempt for username: ${username}`);
    // Zero-knowledge style verification
    const user = await verifyLogin(username, proof);

    if (!user) {
      return res.status(401).json({
        error: "Invalid authentication proof",
      });
    }

    // Successful authentication
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { username } = req.body || {};
    console.log(`[AUTH ROUTE] Logout event for username: ${username || 'Unknown'}`);

    return res.json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
