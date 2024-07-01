const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("dotenv");

const rootDir = require("../utils/path");
const swaggerSpec = require("../swagger");

const router = express.Router();
env.config();

router.use(cors());

router.use(cookieParser());

// Use Swagger UI
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.use(express.static(path.join(rootDir, "public")));

module.exports = router;
