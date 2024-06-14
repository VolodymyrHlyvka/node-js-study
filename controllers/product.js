const { v4: uuidv4 } = require("uuid");

const Product = require("../models/product");

// we register middleware in index.js with additional request field - user
exports.addProduct = (req, res) => {
  // first approach via sequelize
  req.user
    .createProduct({
      id: uuidv4(),
      name: req.body.name,
      price: req.body.price,
    })
    // second approach
    // Product.create({
    //   id: uuidv4(),
    //   name: req.body.name,
    //   price: req.body.price,
    //   userId: req.user.id,
    // })
    .then((product) => {
      res.send(product);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.updateProduct = (req, res) => {
  // url - 'admin/product' (req.query.id)
  // url - '/admin/product?id=bc9f9831-428e-4412-92b3-0ded5fae0693'  req.query = { id: 'bc9f9831-428e-4412-92b3-0ded5fae0693' }
  Product.findByPk(req.query.id)
    .then((product) => {
      product.name = "Car 2";
      return product.save();
    })
    .then((product) => {
      res.send(product);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.deleteProduct = (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send("Success");
    })
    .catch((e) => {
      console.log("error", e);
    });
};
