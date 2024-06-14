const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql_database", "root", "admin", {
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = sequelize;
