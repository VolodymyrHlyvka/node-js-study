const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.getProducts((products) => {
    res.send(products);
  });
};

exports.getProduct = (req, res) => {
  res.send('getProduct');
};
