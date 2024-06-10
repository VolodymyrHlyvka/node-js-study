const path = require("path");

const rootDir = require("../utils/path");
const Product = require("../models/product");

exports.getAddProduct = (_, res) => {
  res.sendFile(path.join(rootDir, "views", "product-form.html"));
};

exports.addProduct = (req, res) => {
  const product = new Product(req.body.name, req.body.price);
  product.addProduct();
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  Product.getProducts((products) => {
    res.send(products);
  });
};
