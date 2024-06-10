const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

// template engine setup
app.set("view engine", "ejs");
// tell node whre to find our templates (views folder)
app.set("views", "views");

const rootDir = require("./utils/path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFoundRoutes = require("./routes/404");

const hostname = "127.0.0.1";
const port = 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// access to static files (css, fonts, images and ...)
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.router);
app.use(shopRoutes);
app.use(notFoundRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
