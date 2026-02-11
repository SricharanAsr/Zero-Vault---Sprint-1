const app = require("./app");
const connectDB = require("./config/db.config");

/* -------------------- START SERVER -------------------- */
// Basic crash protection/logging
process.on("uncaughtException", (err) => {
    console.error("[CRITICAL] Uncaught Exception:", err.stack || err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("[CRITICAL] Unhandled Rejection at:", promise, "reason:", reason);
});

// Connect to MongoDB before starting server
(async () => {
    try {
        await connectDB();

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    } catch (err) {
        console.error("[STARTUP ERROR] Failed to start server:", err);
        process.exit(1);
    }
})();
