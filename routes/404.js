const express = require("express");

const router = express.Router();

router.use((_, res) => {
  res.status(404).send('Not found');
});

module.exports = router;
