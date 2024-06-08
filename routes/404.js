const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");

const router = express.Router();

router.use((_, res) => {
  // first approach:
  // res.status(404).sendFile(path.join(__dirname, "../", "views", "404.html"));
  // second approach with additional helper
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

module.exports = router;
