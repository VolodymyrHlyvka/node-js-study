const Products = require("../models/product");

exports.addProduct = (req, res) => {
  const userId = req.user["_id"];
  const product = new Products(req.body.name, req.body.price, null, userId);

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
  // url - '/admin/product?id=66746b890402fda0f5d4df0a'  req.query = { id: '66746b890402fda0f5d4df0a' }
  Products.findByPk(req.query.id)
    .then((product) => {
      const userId = req.user["_id"];
      const newName = req.body.name;
      const newPrice = req.body.price;
      const updateProduct = new Products(newName, newPrice, product["_id"], userId);
      return updateProduct.save();
    })
    .then((product) => {
      res.send(product);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.deleteProduct = (req, res) => {
  Products.deleteById(req.params.id)
    .then(() => {
      res.send("Product deleted successfully");
    })
    .catch((e) => {
      console.log("error", e);
    });
};
