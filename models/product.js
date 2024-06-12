const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "products.json");

const readFromFile = (callback) => {
  fs.readFile(p, (err, data) => {
    let products = [];
    if (!err) {
      products = JSON.parse(data);
    }
    callback(products);
  });
};

module.exports = class Product {
  constructor(name, price) {
    this.id = uuidv4();
    this.name = name;
    this.price = price;
  }

  addProduct(callback) {
    readFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (!err) {
          callback();
        }
      });
    });
  }

  static removeProduct(id, callback) {
    readFromFile((products) => {
      const filteredProducts = products.filter((product) => product.id !== id);
      fs.writeFile(p, JSON.stringify(filteredProducts), (err) => {
        if (!err) {
          callback();
        }
      });
    });
  }

  static getProducts(callback) {
    readFromFile(callback);
  }

  static getProduct(id, callback) {
    readFromFile((products) => {
      const product = products.find((product) => product.id === id);
      if (product) {
        callback(product);
      } else {
        // throw new Error("No such product in database");
      }
    });
  }
};
