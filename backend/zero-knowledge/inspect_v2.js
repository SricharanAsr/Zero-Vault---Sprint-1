const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "database_v2.sqlite"),
    logging: false,
});

async function inspect() {
    try {
        const users = await sequelize.query("SELECT * FROM Users", { type: Sequelize.QueryTypes.SELECT });
        console.log("=== USERS IN v2 DB ===");
        console.table(users);
    } catch (error) {
        console.error("Error:", error);
    }
}

inspect();
