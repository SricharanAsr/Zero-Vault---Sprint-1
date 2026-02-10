const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user.model");
const Device = require("../src/models/device.model");

describe("Authentication API", () => {
    let testUserId;
    const testUser = {
        username: `test-${Date.now()}@example.com`,
        proof: "test-proof"
    };

    beforeAll(async () => {
        const MONGODB_URI = process.env.TEST_MONGO_URI || "mongodb://localhost:27017/zero-knowledge-test";
        await mongoose.connect(MONGODB_URI);
    });

    afterAll(async () => {
        if (testUserId) {
            await Device.deleteMany({ userId: testUserId });
        }
        await User.deleteMany({ username: testUser.username });
        await mongoose.connection.close();
    });

    test("POST /api/v1/auth/register - success", async () => {
        const res = await request(app)
            .post("/api/v1/auth/register")
            .send(testUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.user.username).toBe(testUser.username);
        testUserId = res.body.user.id;
    });

    test("POST /api/v1/auth/login - success", async () => {
        const res = await request(app)
            .post("/api/v1/auth/login")
            .send({
                username: testUser.username,
                proof: testUser.proof,
                deviceId: "test-device-1",
                deviceName: "Test Laptop"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body.user.username).toBe(testUser.username);
    });

    test("POST /api/v1/auth/login - failure (wrong proof)", async () => {
        const res = await request(app)
            .post("/api/v1/auth/login")
            .send({
                username: testUser.username,
                proof: "wrong-proof"
            });

        expect(res.statusCode).toBe(401);
    });
});
