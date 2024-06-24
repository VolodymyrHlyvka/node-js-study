const express = require("express");
const { google } = require("googleapis");

const router = express.Router();

router.post("/", (req, res) => {
  google
    .discoverAPI(process.env.DISCOVERY_URL)
    .then((client) => {
      client.comments.analyze(
        {
          key: process.env.PERSPECTIVE_API_KEY,
          resource: {
            comment: { text: req.body.text },
            languages: ["en"],
            requestedAttributes: { TOXICITY: {} },
          },
        },
        (err, response) => {
          if (err) throw err;
          res.send(response.data);
        }
      );
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
