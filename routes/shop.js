const express = require("express");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/products", shopController.getProducts);

router.get("/product/:id", shopController.getProduct);

module.exports = router;
