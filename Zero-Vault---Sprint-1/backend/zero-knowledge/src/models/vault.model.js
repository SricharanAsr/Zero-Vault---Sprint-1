const mongoose = require("mongoose");

const vaultSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    encryptedVault: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Vault = mongoose.model("Vault", vaultSchema);

module.exports = Vault;
