const express = require("express");
const router = express.Router();

const {
    getHomePage,
    createShortURL,
    redirectURL,
    deleteURL,
} = require("../controllers/urlController");
const {
    checkForAuthentication,
} = require("../middlewares/auth");


// Dashboard
router.get("/", checkForAuthentication, getHomePage);

// Create URL
router.post("/", checkForAuthentication, createShortURL);
router.post("/delete/:id", checkForAuthentication, deleteURL);
router.get("/:shortId", redirectURL);

module.exports = router;