const bcrypt = require("bcrypt");
const User = require("../models/user");

// ================= Signup Page =================
async function getSignupPage(req, res) {

    if (req.session.user) {
        return res.redirect("/");
    }

    res.render("signup", {
        error: null,
    });
}

// ================= Signup User =================
async function signupUser(req, res) {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render("signup", {
                error: "Email already exists!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.redirect("/user/login");

    } catch (error) {

        console.log(error);

        res.render("signup", {
            error: "Something went wrong!",
        });
    }
}

// ================= Login Page =================
async function getLoginPage(req, res) {

    if (req.session.user) {
        return res.redirect("/");
    }

    res.render("login", {
        error: null,
    });
}

// ================= Login User =================
async function loginUser(req, res) {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.render("login", {
                error: "Invalid Email or Password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render("login", {
                error: "Invalid Email or Password",
            });
        }

        req.session.user = user;

        res.redirect("/");

    } catch (error) {

        console.log(error);

        res.render("login", {
            error: "Login Failed!",
        });
    }
}

// ================= Logout =================
function logoutUser(req, res) {

    req.session.destroy(() => {
        res.redirect("/user/login");
    });

}

module.exports = {
    getSignupPage,
    signupUser,
    getLoginPage,
    loginUser,
    logoutUser,
};