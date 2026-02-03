const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");

const authRoutes = require("./routes/auth.routes");
const vaultRoutes = require("./routes/vault.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

/* -------------------- MIDDLEWARES -------------------- */
app.use(cors());
app.use(express.json()); // REQUIRED for req.body

/* -------------------- HEALTH CHECK -------------------- */
app.get("/ping", (req, res) => {
  res.json({ message: "Backend is running" });
});

/* -------------------- ROUTES -------------------- */
app.use("/auth", authRoutes);
app.use("/vault", vaultRoutes);

/* -------------------- ERROR HANDLER (LAST) -------------------- */
app.use(errorHandler);

/* -------------------- START SERVER -------------------- */
// Connect to MongoDB before starting server
(async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
