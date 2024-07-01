const express = require("express");
const { google } = require("googleapis");

const Messages = require("../models/message");
const { getKey } = require("../utils/keys");

const router = express.Router();

const DISCOVERY_URL = process.env.DISCOVERY_URL;
const PERSPECTIVE_API_KEY = process.env.PERSPECTIVE_API_KEY;

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
    .discoverAPI(DISCOVERY_URL)
    .then((client) => {
      client.comments.analyze(
        {
          key: PERSPECTIVE_API_KEY,
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
