const express = require("express");

const cartController = require("../controllers/cart");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.use(isAuth);

router.get("/cart", cartController.getCart);

router.post("/cart/:id", cartController.addToCart);

router.put("/cart/:id", cartController.updateCart);

router.delete("/cart/:id", cartController.removeFromCart);

module.exports = router;
