const Vault = require("../models/vault.model");

module.exports = {
  async save(username, encryptedVault) {
    try {
      // Check if vault exists
      const existingVault = await Vault.findOne({ username });

      if (existingVault) {
        // Update
        existingVault.encryptedVault = encryptedVault;
        await existingVault.save();
      } else {
        // Create
        await Vault.create({ username, encryptedVault });
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
