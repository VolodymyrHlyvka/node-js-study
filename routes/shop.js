const express = require("express");

const shopController = require("../controllers/shop");
const { authenticateToken } = require("../controllers/jwt-token");

const router = express.Router();

// router.use(authenticateToken);

router.get("/products", authenticateToken, shopController.getProducts);

router.get("/product/:id", authenticateToken, shopController.getProduct);

module.exports = router;
