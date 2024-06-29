const Products = require("../models/product");

exports.getProducts = (req, res) => {
  // const isLoggedIn = req.cookies["loggedIn"];

  Products.find()
    // select allows us to select which field to select and -[field_name] to exclude
    .select("name price -_id")
    // populate allows us to get all info via ref
    .populate("userId", "name")
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
