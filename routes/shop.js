const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.use(isAuth);

router.get("/products", shopController.getProducts);

router.get("/product/:id", shopController.getProduct);

module.exports = router;
