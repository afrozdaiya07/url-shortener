const express = require("express");
const router = express.Router();

const {
    getHomePage,
    createShortURL,
} = require("../controllers/urlController");

const {
    checkForAuthentication,
} = require("../middlewares/auth");

// Dashboard
router.get("/", checkForAuthentication, getHomePage);

// Create URL
router.post("/", checkForAuthentication, createShortURL);

module.exports = router;