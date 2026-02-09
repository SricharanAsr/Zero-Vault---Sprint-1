const app = require("./app");
const connectDB = require("./config/db.config");

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
