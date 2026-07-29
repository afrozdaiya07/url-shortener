const express = require("express");
const path = require("path");
require("dotenv").config();
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./middlewares/auth");

const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = process.env.PORT || 7001;

// MongoDB Connection
connectToMongoDB(process.env.MONGO_URl)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" MongoDB Error:", err));

// Middleware
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// Routes
app.use("/user", userRoute);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route

app.use("/", urlRoute);
// app.get("/", checkForAuthentication, (req, res) => {
//     res.send(`Welcome ${req.session.user.name}`);
// });
// app.get("/", (req, res) => {
//   res.send("Short URL Project Started");
// });

// Server
app.listen(PORT, () => {
  console.log(` Server Running on http://localhost:${PORT}`);
});