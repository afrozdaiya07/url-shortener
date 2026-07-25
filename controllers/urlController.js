const { nanoid } = require("nanoid");
const URL = require("../models/url");

// Dashboard
async function getHomePage(req, res) {
    const allUrls = await URL.find({
        createdBy: req.session.user._id,
    });

    res.render("home", {
        user: req.session.user,
        urls: allUrls,
    });
}

// Create Short URL
async function createShortURL(req, res) {
    const { redirectURL } = req.body;

    if (!redirectURL) {
        return res.send("URL is required");
    }

    const shortId = nanoid(8);

    await URL.create({
        shortId,
        redirectURL,
        createdBy: req.session.user._id,
    });

    res.redirect("/");
}

module.exports = {
    getHomePage,
    createShortURL,
};