const Product = require("../models/product");

exports.addProduct = (req, res) => {
  const product = new Product(req.body.name, req.body.price);
  product.addProduct();
  // res.redirect("/");
  res.send('Product has been added successfully')
};

exports.updateProduct = (req, res) => {
  res.send('updateProduct');
};
exports.deleteProduct = (req, res) => {
  res.send('deleteProduct');
};
