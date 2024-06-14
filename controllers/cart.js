const Product = require("../models/product");

exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.addToCart = (req, res) => {
  const productId = req.params.id;
  let userCart;
  let quantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return req.user.createCart();
      }
      return cart;
    })
    .then((cart) => {
      userCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length) {
        product = products[0];
      }
      if (product) {
        quantity = product.cartItem.quantity + 1;
        return product;
      }

      return Product.findByPk(productId);
    })
    .then((product) => {
      return userCart.addProduct(product, {
        through: { quantity },
      });
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
exports.updateCart = (req, res) => {
  res.send("updateCart");
};
exports.removeFromCart = (req, res) => {
  const productId = req.params.id;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
