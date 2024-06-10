const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  addProduct() {
    fs.readFile(p, (err, data) => {
      let products = [];
      if (!err) {
        products = JSON.parse(data);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log("err", err);
      });
    });
  }

  static getProducts(callback) {
    fs.readFile(p, (err, data) => {
      let products = [];
      if (!err) {
        products = JSON.parse(data);
      }
      callback(products);
    });
  }
};
