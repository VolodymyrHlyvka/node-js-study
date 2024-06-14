const { v4: uuidv4 } = require("uuid");

const Product = require("../models/product");

exports.addProduct = (req, res) => {
  Product.create({
    id: uuidv4(),
    name: req.body.name,
    price: req.body.price,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.updateProduct = (req, res) => {
  // url - 'admin/product' (req.query.id)
  // url - '/admin/product?id=bc9f9831-428e-4412-92b3-0ded5fae0693'  req.query = { id: 'bc9f9831-428e-4412-92b3-0ded5fae0693' }
  console.log("req.query", req.query);
  res.send("updateProduct");
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
