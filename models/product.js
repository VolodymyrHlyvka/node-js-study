const { v4: uuidv4 } = require("uuid");

const db = require("../utils/database");

module.exports = class Product {
  constructor(name, price) {
    this.id = uuidv4();
    this.name = name;
    this.price = price;
  }

  addProduct() {
    return db.execute("INSERT INTO products (id, name, price) VALUES (?,?,?)", [
      this.id,
      this.name,
      this.price,
    ]);
  }

  static removeProduct(id) {
    return db.execute("DELETE FROM products WHERE id = ?", [id]);
  }

  static getProducts() {
    return db.execute("SELECT * FROM products");
  }

  static getProduct(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
