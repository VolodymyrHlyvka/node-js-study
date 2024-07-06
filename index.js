const express = require("express");
const app = express();
const mongoose = require("mongoose");

const _configs = require("./routes/_config");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");
const validateRoutes = require("./routes/validate");
const authRoutes = require("./routes/auth");
// const { subscribeToIg } = require("./routes/ig_webhook");
const notFoundRoutes = require("./routes/404");

const hostname = process.env.HOST_PATH;
const port = 8080;

app.use(_configs);

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(cartRoutes);
app.use("/validate", validateRoutes);
app.use(notFoundRoutes);

mongoose.connect(process.env.MONGODB_PATH).then(() => {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log("check deploy");
    // subscribeToIg();
  });
});
