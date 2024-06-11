const express = require("express");
const cartController = require("../controllers/cart");

const router = express.Router();

router.get("/cart", cartController.getCart);

router.post("/cart", cartController.addToCart);

router.put("/cart", cartController.updateCart);

router.delete("/cart", cartController.removeFromCart);

module.exports = router;
