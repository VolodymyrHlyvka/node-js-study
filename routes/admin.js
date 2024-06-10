const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");

const router = express.Router();

const products = [];

router.get("/add-product", (_, res) => {
  res.sendFile(path.join(rootDir, "views", "product-form.html"));
});

router.post("/add-product", (req, res) => {
  products.push(req.body);
  res.redirect("/");
});

exports.router = router;
exports.products = products;
