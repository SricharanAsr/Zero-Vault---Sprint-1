const express = require("express");
const router = express.Router();
const Device = require("../models/device.model");
const requireAuth = require("../middleware/auth.middleware");

// List all devices for the authenticated user
router.get("/", requireAuth, async (req, res) => {
    try {
        const devices = await Device.find({ userId: req.user.id });
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch devices" });
    }
});

// Revoke access for a specific device
router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const device = await Device.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!device) {
            return res.status(404).json({ error: "Device not found or unauthorized" });
        }

        res.json({ message: "Device access revoked successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to revoke device access" });
    }
});

module.exports = router;
