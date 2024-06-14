const Product = require("../models/product");

exports.getProducts = (req, res) => {
  req.user
    .getProducts()
    // Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.getProduct = (req, res) => {
  // url - '/product/:id' (req.params.id)
  Product.findByPk(req.params.id)
    .then((product) => {
      res.send(product);
    })
    .catch((e) => {
      console.log("error", e);
    });
};
