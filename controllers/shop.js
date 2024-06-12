const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.getProducts()
    .then((result) => {
      res.send(result[0]);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.getProduct = (req, res) => {
  // url - '/product/:id' (req.params.id)
  Product.getProduct(req.params.id)
    .then((result) => {
      res.send(result[0]);
    })
    .catch((e) => {
      console.log("error", e);
    });
};
