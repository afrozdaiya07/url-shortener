const express = require("express");
const path = require("path");
require("dotenv").config();

const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = process.env.PORT || 7001;

// MongoDB Connection
connectToMongoDB(process.env.MONGO_URL)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" MongoDB Error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", (req, res) => {
  res.send("Short URL Project Started");
});

// Server
app.listen(PORT, () => {
  console.log(` Server Running on http://localhost:${PORT}`);
});