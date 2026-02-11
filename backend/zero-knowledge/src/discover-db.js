const mongoose = require("mongoose");
require("dotenv").config({ path: "../../.env" });

const MONGODB_URI = "mongodb://localhost:27017"; // Root URI to list all DBs

async function findData() {
    try {
        console.log("Connecting to MongoDB...");
        const client = await mongoose.connect(MONGODB_URI);
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();

        console.log("\n--- Database Discovery ---");
        for (let dbMeta of dbs.databases) {
            const dbName = dbMeta.name;
            if (['admin', 'config', 'local'].includes(dbName)) continue;

            const db = mongoose.connection.useDb(dbName);
            // Get collection names
            const collections = await db.db.listCollections().toArray();
            const vaultsColl = collections.find(c => c.name === 'vaults');

            if (vaultsColl) {
                const count = await db.collection('vaults').countDocuments();
                const latest = await db.collection('vaults').find().sort({ updatedAt: -1 }).limit(1).toArray();

                console.log(`Database: ${dbName}`);
                console.log(`  - Vaults count: ${count}`);
                if (latest.length > 0) {
                    console.log(`  - Latest update: ${latest[0].updatedAt || latest[0].createdAt || 'N/A'}`);
                    console.log(`  - Latest User: ${latest[0].username}`);
                }
            } else {
                console.log(`Database: ${dbName} (no vaults collection)`);
            }
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error("Discovery failed:", error);
    }
}

findData();
