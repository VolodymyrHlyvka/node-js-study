const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.getProducts((products) => {
    res.send(products);
  });
};

exports.getProduct = (req, res) => {
  // url - '/product/:id' (req.params.id)
  Product.getProduct(req.params.id, (product) => {
    res.send(product);
  });
};
