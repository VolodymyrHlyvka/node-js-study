const Products = require("../models/product");

exports.addProduct = (req, res) => {
  const { name, price } = req.body;
  const product = new Products({ name, price, userId: req.user._id });
  product
    .save()
    .then((product) => {
      res.send(product);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.updateProduct = (req, res) => {
  // url - '/admin/product?id=6675a3b464fe8792ab9f8162'  req.query = { id: '6675a3b464fe8792ab9f8162' }
  // TODO: remove mock
  req.body = { name: "new name", price: 1000 };
  const { name, price } = req.body;
  Products.findById(req.query.id)
    .then((product) => {
      product.name = name;
      product.price = price;
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
  Products.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Product has been deleted successfully");
    })
    .catch((e) => {
      console.log("error", e);
    });
};
