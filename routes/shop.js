const express = require("express");

const adminData = require("./admin");
const router = express.Router();
const config = { products: adminData.products, title: "Shop" };

router.get("/", (_, res) => {
  res.render("shop", config);
});

module.exports = router;
