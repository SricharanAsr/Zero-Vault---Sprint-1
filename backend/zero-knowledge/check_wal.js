const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "database.sqlite"),
    logging: false,
});

async function checkMode() {
    try {
        const [result] = await sequelize.query("PRAGMA journal_mode;");
        console.log("Journal Mode:", result[0].journal_mode);
    } catch (error) {
        console.error("Error:", error);
    }
}

checkMode();
