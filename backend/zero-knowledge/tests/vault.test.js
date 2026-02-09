const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user.model");
const Vault = require("../src/models/vault.model");
const jwt = require("jsonwebtoken");

describe("Vault API", () => {
    let token;
    let userId;
    const testUsername = `vault-test-${Date.now()}@example.com`;

    beforeAll(async () => {
        const MONGODB_URI = "mongodb://localhost:27017/zero-knowledge-test";
        await mongoose.connect(MONGODB_URI);

        // Create test user and token
        const user = await User.create({ username: testUsername, expectedProof: "proof" });
        userId = user._id;
        token = jwt.sign({ id: userId, username: testUsername }, process.env.JWT_SECRET || "default_secret");
    });

    afterAll(async () => {
        await User.deleteMany({ username: testUsername });
        await Vault.deleteMany({ username: testUsername });
        await mongoose.connection.close();
    });

    test("POST /api/v1/vault/upload - success", async () => {
        const res = await request(app)
            .post("/api/v1/vault/upload")
            .set("Authorization", `Bearer ${token}`)
            .send({ encryptedVault: "encrypted-data-v1" });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toContain("stored successfully");
    });

    test("GET /api/v1/vault/data - success", async () => {
        const res = await request(app)
            .get("/api/v1/vault/data")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.encryptedVault).toBe("encrypted-data-v1");
    });

    test("POST /api/v1/vault/upload - unauthorized", async () => {
        const res = await request(app)
            .post("/api/v1/vault/upload")
            .send({ encryptedVault: "data" });

        expect(res.statusCode).toBe(401);
    });
});
