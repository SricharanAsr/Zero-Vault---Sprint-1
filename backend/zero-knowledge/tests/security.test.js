const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

describe("Security & Versioning API", () => {
    beforeAll(async () => {
        const MONGODB_URI = process.env.TEST_MONGO_URI || "mongodb://localhost:27017/zero-knowledge-test";
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGODB_URI);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("API Versioning - /api/v1/auth/login exists", async () => {
        const res = await request(app)
            .post("/api/v1/auth/login")
            .send({ username: "non-existent", proof: "none" });

        expect(res.statusCode).not.toBe(404);
    });

    test("API Versioning - /api/v2/... should 404", async () => {
        const res = await request(app).get("/api/v2/any");
        expect(res.statusCode).toBe(404);
    });

    test("Rate Limiting headers present", async () => {
        const res = await request(app).get("/ping");
        expect(res.headers).toHaveProperty("x-ratelimit-limit");
    });
});
