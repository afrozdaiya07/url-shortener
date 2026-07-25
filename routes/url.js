const express = require("express");
const router = express.Router();

const {
    getHomePage,
    createShortURL,
    redirectURL,
} = require("../controllers/urlController");

const {
    checkForAuthentication,
} = require("../middlewares/auth");


// Dashboard
router.get("/", checkForAuthentication, getHomePage);

// Create URL
router.post("/", checkForAuthentication, createShortURL);
router.get("/:shortId", redirectURL);
router.get("/delete/:id", checkForAuthentication, deleteURL);
module.exports = router;