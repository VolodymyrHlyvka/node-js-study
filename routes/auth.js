const express = require("express");
const csrf = require("csurf");

const authController = require("../controllers/auth");

const router = express.Router();
const csrfProtection = csrf();

router.get("/login", csrfProtection, authController.login);

router.post("/register", authController.register);

router.post("/logout", csrfProtection, authController.logout);

module.exports = router;
