const express = require("express");
const router = express.Router();

const {
  getSignupPage,
  signupUser,
} = require("../controllers/userController");

// Signup Page
router.get("/signup", getSignupPage);

// Signup Form Submit
router.post("/signup", signupUser);

module.exports = router;