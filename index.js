const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");
const rootDir = require("./utils/path");
const sequelize = require("./utils/database");

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

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(cartRoutes);
app.use(notFoundRoutes);

sequelize
  .sync()
  .then((res) => {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.log("res", res);
  });
