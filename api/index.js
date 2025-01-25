const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//recup user model
const User = require("./models/User");

//bcrypt
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

//JWT
const jwt = require("jsonwebtoken");
const secret = "jloiztydddiygdsdsqkhsyqudfshdihyfsh";
const cookieParser = require("cookie-parser");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser);

//mongoDB connection
mongoose
  .connect(
    "mongodb+srv://hugues-mern:jOSxRc3cSHFutkwC@cluster0.omery.mongodb.net/blog"
  )
  .then(() => console.log("Connexion database ok"))
  .catch(() => console.log("Connexion refusée"));

//register user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

//login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const verifyPass = bcrypt.compareSync(password, userDoc.password);
  if (verifyPass) {
    //logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("Accès refusée !");
  }
});

//get profile user
app.get("/my-profil", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.listen(4000, () => {
  console.log("serveur en ligne !");
});
