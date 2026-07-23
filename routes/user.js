const express = require("express");
const router = express.Router();

const {
  getSignupPage,
  signupUser,
  getLoginPage,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.get("/signup", getSignupPage);
router.post("/signup", signupUser);

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.get("/logout", logoutUser);

module.exports = router;