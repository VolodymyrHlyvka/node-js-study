const express = require("express");

const adminData = require("./admin");
const router = express.Router();

router.get("/", (_, res) => {
  res.render("shop", { products: adminData.products });
});

module.exports = router;
