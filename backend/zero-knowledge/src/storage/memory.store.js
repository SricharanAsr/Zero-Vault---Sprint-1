const Vault = require("../models/vault.model");

module.exports = {
  async save(username, encryptedVault) {
    try {
      console.log(`[STORAGE] Saving vault for user: ${username}`);
      const result = await Vault.findOneAndUpdate(
        { username },
        { encryptedVault, updatedAt: new Date() },
        { new: true, upsert: true }
      );
      console.log(`[STORAGE] Vault saved successfully for: ${username}`);

      return result;
    } catch (error) {
      console.error("Vault Save Error:", error);
      throw error;
    }
  },

  async get(username) {
    try {
      console.log(`[STORAGE] Fetching vault for user: ${username}`);
      const vault = await Vault.findOne({ username });
      console.log(`[STORAGE] Vault ${vault ? 'found' : 'not found'} for user: ${username}`);
      return vault ? vault.encryptedVault : null;
    } catch (error) {
      console.error("Vault Get Error:", error);
      return null;
    }
  },
};
