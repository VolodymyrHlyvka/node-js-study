const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");
const rootDir = require("./utils/path");
const sequelize = require("./utils/database");

const Product = require("./models/product");
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");
const notFoundRoutes = require("./routes/404");

const hostname = "127.0.0.1";
const port = 8080;

// Use Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(rootDir, "public")));

// middleware to add user (sequelize object) to each request -  req.user = user
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("err", err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(cartRoutes);
app.use(notFoundRoutes);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// for develop mode {force: true} for sync() will destroy our old table and create a new one
sequelize
  .sync()
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
