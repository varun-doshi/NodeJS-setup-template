const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const port = 3000;
require("dotenv").config();

app.use(express.json());

app.get("/suchita", async (req, res) => {
  console.log("here");
  res.send("alive");
});
//READ
app.get("/find", async (req, res) => {
  const doc = await User.find();
  if (doc) {
    res.json(doc);
  } else {
    res.send("not available");
  }
});

app.get("/search/:id", async (req, res) => {
  const { id } = req.params;
  const doc = await User.find({ username: id });
  if (doc) {
    res.json(doc);
  } else {
    res.send("not available");
  }
});
//WRITE
app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username: username,
      password: password,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

//DELETE
app.delete("/delete", async (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  try {
    const userDoc = await User.deleteOne({
      username: username,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.listen(port, () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log(`Listening on http://localhost:${port}`);
});

// 127:0:0:1=>localhost
// http://127:0:0:1:3000
