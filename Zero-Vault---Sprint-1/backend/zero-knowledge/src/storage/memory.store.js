const Vault = require("../models/vault.model");

module.exports = {
  async save(username, encryptedVault) {
    try {
      const result = await Vault.findOneAndUpdate(
        { username },
        { encryptedVault, updatedAt: new Date() },
        { new: true, upsert: true }
      );

      return result;
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
