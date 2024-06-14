const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.getProduct = (req, res) => {
  // url - '/product/:id' (req.params.id)
  Product.findByPk(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error", e);
    });
};
