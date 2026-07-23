const bcrypt = require("bcrypt");
const User = require("../models/user");

// Signup Page
async function getSignupPage(req, res) {
  res.render("signup");
}

// Signup User
async function signupUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send("User already exists");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.send("Signup Successful");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
}
// Login Page
async function getLoginPage(req, res) {
    res.render("login");
}

// Login User
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Incorrect Password");
        }

        req.session.user = user;

        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.send("Login Failed");
    }
}

// Logout
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