const mongoose = require("mongoose");
const Vault = require("./models/vault.model");
require("dotenv").config({ path: "../../.env" });

const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/zero-knowledge";

async function checkDB() {
    try {
        console.log(`Attempting to connect to: ${MONGODB_URI.replace(/:([^:@]+)@/, ":***@")}`);
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const vaultCount = await Vault.countDocuments();
        console.log(`Total vaults found: ${vaultCount}`);

        if (vaultCount > 0) {
            const vaults = await Vault.find().limit(5);
            console.log("Recent vaults (usernames):");
            vaults.forEach(v => console.log(`- ${v.username}`));
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error("Database check failed:", error);
    }
}

checkDB();
