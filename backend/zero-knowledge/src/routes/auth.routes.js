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
      });
    }

    console.log(`[AUTH ROUTE] Register attempt for username: ${username}`);
    const result = await register(username, proof);

    if (!result) {
      return res.status(409).json({
        error: "User already exists",
      });
    }

    return res.status(201).json({
      message: "Registration successful",
      user: result,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
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

module.exports = router;
