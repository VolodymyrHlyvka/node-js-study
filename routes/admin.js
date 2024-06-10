const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");

const router = express.Router();

const products = [];

router.get("/add-product", (_, res) => {
  res.render("product-form");
});

router.post("/add-product", (req, res) => {
  products.push(req.body);
  res.redirect("/");
});

exports.products = products;
exports.router = router;
