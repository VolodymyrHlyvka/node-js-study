const Products = require("../models/product");

exports.getCart = (req, res) => {
  const user = req.user;
  console.log(req.user);

  //TODO: ???
  req.user
    .save()
    .then((result) => {
      return result.populate("cart.products.productId");
    })
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

  Products.findById(productId)
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
  Products.findById(productId)
    .then((product) => {
      return user.addToCart(product, quantity);
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
  Products.findById(productId)
    .then((product) => {
      return user.removeFromCart(product);
    })
    .then(() => {
      res.send("Product has been successfully removed from the cart");
    })
    .catch((e) => {
      console.log("error", e);
    });
};
