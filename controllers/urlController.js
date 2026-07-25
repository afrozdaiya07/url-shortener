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
async function redirectURL(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $inc: {
                clicks: 1,
            },
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        {
            new: true,
        }
    );

    if (!entry) {
        return res.send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
}
async function deleteURL(req, res) {

    await URL.findByIdAndDelete(req.params.id);

    res.redirect("/");

}
module.exports = {
    getHomePage,
    createShortURL,
    redirectURL,
    deleteURL,
};