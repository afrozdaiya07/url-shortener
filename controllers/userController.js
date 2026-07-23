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

module.exports = {
  getSignupPage,
  signupUser,
};