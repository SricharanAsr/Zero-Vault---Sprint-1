const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");

const authRoutes = require("./routes/auth.routes");
const vaultRoutes = require("./routes/vault.routes");
const deviceRoutes = require("./routes/device.routes");
const errorHandler = require("./middleware/error.middleware");

const rateLimit = require("express-rate-limit");

const app = express();

/* -------------------- RATE LIMITING -------------------- */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many requests, please try again later." }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // stricter limit for auth routes
  message: { error: "Too many login/register attempts, please try again later." }
});

/* -------------------- MIDDLEWARES -------------------- */
app.use(cors());
app.use(express.json()); // REQUIRED for req.body

// Disable rate limiting in CI/Test to prevent false negatives
if (process.env.NODE_ENV !== "test" && process.env.CI !== "true") {
  app.use(globalLimiter);
}

/* -------------------- HEALTH CHECK -------------------- */
app.get("/ping", (req, res) => {
  res.json({ message: "Backend is running", version: "v1" });
});

/* -------------------- ROUTES -------------------- */
const apiPrefix = "/api/v1";
const isTestEnv = process.env.NODE_ENV === "test" || process.env.CI === "true";

app.use(`${apiPrefix}/auth`, isTestEnv ? authRoutes : [authLimiter, authRoutes]);
app.use(`${apiPrefix}/vault`, vaultRoutes);
app.use(`${apiPrefix}/devices`, deviceRoutes);

/* -------------------- ERROR HANDLER (LAST) -------------------- */
app.use(errorHandler);

/* -------------------- ERROR HANDLER (LAST) -------------------- */
app.use(errorHandler);

module.exports = app;
