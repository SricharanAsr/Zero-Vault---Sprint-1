const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
});

async function inspect() {
    try {
        const tables = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table'", { type: Sequelize.QueryTypes.SELECT });
        console.log("Tables:", tables);

        const users = await sequelize.query("SELECT * FROM Users", { type: Sequelize.QueryTypes.SELECT });
        console.log("=== USERS ===");
        console.table(users);
    } catch (error) {
        console.error("Error:", error);
    }
}

inspect();
