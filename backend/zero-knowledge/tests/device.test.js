const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user.model");
const Device = require("../src/models/device.model");
const jwt = require("jsonwebtoken");

describe("Device API", () => {
    let token;
    let userId;
    const testUsername = `device-test-${Date.now()}@example.com`;

    beforeAll(async () => {
        const MONGODB_URI = process.env.TEST_MONGO_URI || "mongodb://localhost:27017/zero-knowledge-test";
        await mongoose.connect(MONGODB_URI);

        const user = await User.create({ username: testUsername, expectedProof: "proof" });
        userId = user._id;
        token = jwt.sign({ id: userId, username: testUsername }, process.env.JWT_SECRET || "default_secret");

        // Create a test device
        await Device.create({
            userId,
            deviceId: "dev-123",
            deviceName: "Original Device"
        });
    });

    afterAll(async () => {
        await User.deleteMany({ username: testUsername });
        await Device.deleteMany({ userId });
        await mongoose.connection.close();
    });

    test("GET /api/v1/devices - list devices", async () => {
        const res = await request(app)
            .get("/api/v1/devices")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.body[0].deviceId).toBe("dev-123");
    });

    test("DELETE /api/v1/devices/:id - revoke device", async () => {
        const devices = await Device.find({ userId });
        const deviceIdToDelete = devices[0]._id;

        const res = await request(app)
            .delete(`/api/v1/devices/${deviceIdToDelete}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toContain("revoked successfully");

        const check = await Device.findById(deviceIdToDelete);
        expect(check).toBeNull();
    });
});
