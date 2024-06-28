const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const swaggerSpec = require("./swagger");
const rootDir = require("./utils/path");
const Users = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const notFoundRoutes = require("./routes/404");

const hostname = "127.0.0.1";
const port = 8080;

app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Use Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(rootDir, "public")));

// middleware to add user to each request -  req.user = user
app.use((req, res, next) => {
  Users.findById("6675a96477806ee04a12c719")
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
app.use(notFoundRoutes);

mongoose.connect("mongodb://root:example@localhost:27017/").then(() => {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
