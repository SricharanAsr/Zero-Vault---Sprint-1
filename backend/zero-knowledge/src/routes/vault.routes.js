const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/auth.middleware");
const vaultStore = require("../storage/memory.store");

/* ----------------------------------------------------
   POST /vault/upload
   Stores encrypted vault data ONLY
---------------------------------------------------- */
router.post("/upload", requireAuth, async (req, res) => {
  try {
    const { encryptedVault } = req.body;

    console.log(`[VAULT UPLOAD DEBUG] User: ${req.user ? req.user.username : 'UNDEFINED'}`);
    console.log(`[VAULT UPLOAD DEBUG] Payload Size: ${encryptedVault ? encryptedVault.length : 'MISSING'}`);

    if (!encryptedVault) {
      return res.status(400).json({
        error: "Encrypted vault data is required",
      });
    }

    await vaultStore.save(req.user.username, encryptedVault);

    return res.json({
      message: "Encrypted vault stored successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/* ----------------------------------------------------
   GET /vault/data
   Returns encrypted vault ONLY to owner
---------------------------------------------------- */
router.get("/data", requireAuth, async (req, res) => {
  try {
    const encryptedVault = await vaultStore.get(req.user.username);

    if (!encryptedVault) {
      return res.status(404).json({
        error: "No vault data found",
      });
    }

    return res.json({
      encryptedVault,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
