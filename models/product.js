const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
