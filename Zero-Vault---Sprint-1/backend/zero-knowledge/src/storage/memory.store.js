const Vault = require("../models/vault.model");

module.exports = {
  async save(username, encryptedVault) {
    try {
      // Check if vault exists
      const existingVault = await Vault.findOne({ username });

      if (existingVault) {
        // Update
        console.log(`[STORAGE] Updating vault for user: ${username}`);
        existingVault.encryptedVault = encryptedVault;
        await existingVault.save();
        console.log(`[STORAGE] Vault updated successfully for user: ${username}`);
      } else {
        // Create
        console.log(`[STORAGE] Creating new vault for user: ${username}`);
        await Vault.create({ username, encryptedVault });
        console.log(`[STORAGE] Vault created successfully for user: ${username}`);
      }
    } catch (error) {
      console.error("Vault Save Error:", error);
      throw error;
    }
  },

  async get(username) {
    try {
      const vault = await Vault.findOne({ username });
      return vault ? vault.encryptedVault : null;
    } catch (error) {
      console.error("Vault Get Error:", error);
      return null;
    }
  },
};
