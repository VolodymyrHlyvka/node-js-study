const express = require("express");
const { google } = require("googleapis");

const Messages = require("../models/message");

const router = express.Router();

const getKey = (key) => {
  switch (key) {
    case "TOXICITY":
      return "toxicity";
    case "SEVERE_TOXICITY":
      return "severeToxisity";
    case "IDENTITY_ATTACK":
      return "identityAttack";
    case "INSULT":
      return "insult";
    case "PROFANITY":
      return "profanity";
    case "THREAT":
      return "threat";
  }
};

router.post("/", (req, res) => {
  const requestParams = req.query;
  const text = req.body.text;

  const getStructure = (response) => {
    if (Array.isArray(requestParams.attribute)) {
      return requestParams.attribute.reduce((acc, key) => {
        acc[getKey(key)] =
          response.data.attributeScores[key].summaryScore.value;
        return acc;
      }, {});
    } else if (typeof requestParams.attribute === "string") {
      return {
        [getKey(requestParams.attribute)]:
          response.data.attributeScores[requestParams.attribute].summaryScore
            .value,
      };
    }
  };

  const getAttributes = () => {
    if (Array.isArray(requestParams.attribute)) {
      return requestParams.attribute.reduce((acc, key) => {
        acc[key] = {};
        return acc;
      }, {});
    } else if (typeof requestParams.attribute === "string") {
      return {
        [requestParams.attribute]: {},
      };
    }
  };

  google
    .discoverAPI(process.env.DISCOVERY_URL)
    .then((client) => {
      client.comments.analyze(
        {
          key: process.env.PERSPECTIVE_API_KEY,
          resource: {
            comment: { text },
            languages: ["en"],
            requestedAttributes: getAttributes(),
          },
        },
        (err, response) => {
          if (err) throw err;

          const message = new Messages({
            message: text,
            ...getStructure(response),
            userId: req.user._id,
          });

          message
            .save()
            .then((message) => {
              res.send(message);
            })
            .catch((e) => {
              console.log("error", e);
            });
        }
      );
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
