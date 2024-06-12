const Product = require("../models/product");

exports.addProduct = (req, res) => {
  const product = new Product(req.body.name, req.body.price);
  product.addProduct(() => {
    res.send("Product has been added successfully");
  });
};

exports.updateProduct = (req, res) => {
  // url - 'admin/product' (req.query.id)
  // url - '/admin/product?id=bc9f9831-428e-4412-92b3-0ded5fae0693'  req.query = { id: 'bc9f9831-428e-4412-92b3-0ded5fae0693' }
  console.log("req.query", req.query);
  res.send("updateProduct");
};

exports.deleteProduct = (req, res) => {
  Product.removeProduct(req.params.id, () => {
    res.send("Product has been deleted successfully");
  });
};
