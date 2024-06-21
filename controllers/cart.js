const Product = require("../models/product");

exports.getCart = (req, res) => {
  const user = req.user;
  user
    .getCart()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.addToCart = (req, res) => {
  const productId = req.params.id;
  const user = req.user;

  Product.findByPk(productId)
    .then((product) => {
      return user.addToCart(product);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.updateCart = (req, res) => {
  const user = req.user;
  const quantity = req.query.quantity;
  const productId = req.params.id;
  Product.findByPk(productId)
    .then((product) => {
      return user.updateCart(product, quantity);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.removeFromCart = (req, res) => {
  const productId = req.params.id;
  const user = req.user;
  Product.findByPk(productId)
    .then((product) => {
      return user.removeFromCart(product);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error", e);
    });
};
