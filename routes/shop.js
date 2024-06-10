const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");
const productController = require("../controllers/product");

const router = express.Router();

router.get("/", (_, res) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

router.get("/products", productController.getProducts);

module.exports = router;
