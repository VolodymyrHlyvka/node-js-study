const Products = require("../models/product");

exports.getProducts = (req, res) => {
  Products.fetchAll()
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.getProduct = (req, res) => {
  // url - '/product/:id' (req.params.id)
  Products.findById(req.params.id)
    .then((product) => {
      res.send(product);
    })
    .catch((e) => {
      console.log("error", e);
    });
};
