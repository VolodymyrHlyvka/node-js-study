const axios = require("axios");

const VERIFY_TOKEN = "YOUR_VERIFY_TOKEN";
const INSTAGRAM_ACCESS_TOKEN = "YOUR_INSTAGRAM_ACCESS_TOKEN";

const APP_ID = "YOUR_APP_ID";
const APP_SECRET = "YOUR_APP_SECRET";
const PAGE_ID = "YOUR_PAGE_ID"; // Facebook Page ID connected to the Instagram account

// Endpoint for webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Endpoint to receive webhook notifications
app.post("/webhook", (req, res) => {
  const data = req.body;

  if (data.object === "instagram") {
    data.entry.forEach((entry) => {
      entry.changes.forEach((change) => {
        if (change.field === "media") {
          console.log("New post detected:", change.value);
        }
      });
    });
  }

  res.sendStatus(200);
});

// Function to subscribe to Instagram webhook
async function subscribeToWebhook() {
  const url = `https://graph.facebook.com/v10.0/${PAGE_ID}/subscribed_apps`;
  const response = await axios.post(url, null, {
    params: {
      subscribed_fields: "media",
      access_token: `${APP_ID}|${APP_SECRET}`,
    },
  });
  console.log("Subscription response:", response.data);
}

exports.subscribeToIg = subscribeToWebhook;
