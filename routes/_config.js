const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const env = require("dotenv");

const rootDir = require("../utils/path");
const swaggerSpec = require("../swagger");

const router = express.Router();
env.config();

const store = new MongoDBStore({
  uri: process.env.MONGODB_PATH,
  collection: "mySessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

router.use(cors());

router.use(cookieParser());
router.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Use Swagger UI
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.use(express.static(path.join(rootDir, "public")));

module.exports = router;
