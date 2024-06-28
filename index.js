const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Users = require("./models/user");

const _configs = require("./routes/_config");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");
const validateRoutes = require("./routes/validate");
const authRoutes = require("./routes/auth");
// const { subscribeToIg } = require("./routes/ig_webhook");

const notFoundRoutes = require("./routes/404");

const hostname = "127.0.0.1";
const port = 8080;

app.use(_configs);

// middleware to add user to each request -  req.user = user
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  Users.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("err", err);
    });
});

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(cartRoutes);
app.use("/validate", validateRoutes);
app.use(notFoundRoutes);

mongoose.connect(process.env.MONGODB_PATH).then(() => {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    // subscribeToIg();
  });
});
