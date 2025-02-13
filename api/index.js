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
const jwt_secret = "jloiztydddiygdsdsqkhsyqudfshdihyfsh";
const cookieParser = require("cookie-parser");

//multer pour les images
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

//mongoDB connection
mongoose
  .connect(
    "mongodb+srv://hugues777:admin@blog.bry0q.mongodb.net/blog"
    // "mongodb+srv://hugues-mern:25101997livE@cluster0.omery.mongodb.net/?retryWrites=true&w=majority&appName=blog"
    // "mongodb+srv://Books_user:25101997@cluster0.cvim7.mongodb.net/vGrmoire_db"
    // "mongodb+srv://hugues-mern:jOSxRc3cSHFutkwC@cluster0.omery.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
  try {
    // const { username, password } = req.body;
    const userDoc = await User.findOne({ username: req.body.username });
    if (!userDoc) {
      res.status(401).json({ message: "Pas de connexion, réessayer!" });
      // res.json({ message: "ECHEC PAPA" });
      return;
    }
    const verifyPass = bcrypt.compareSync(req.body.password, userDoc.password);
    if (!verifyPass) {
      res.status(401).json({ message: "Pas de connexion MDP, réessayer!" });
      // res.json({ message: "ECHEC PAPA" });
      return;
    }
    // const expiryDate = new Date(Date.now() + 3600000); //1 heure de connexion
    const tokenValid = jwt.sign({ id: userDoc._id }, jwt_secret);

    res.status(200).json({ token: tokenValid, username: userDoc.username });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//poster article
app.post("/post", uploadMiddleware.single("file"), (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);
  // res.json({ files: req.file });
  res.json(parts[1]);
});

//test
app.get("/test", (req, res) => {
  res.send("hello MAMAN");
});

//lancement serveur
app.listen(4000, () => {
  console.log("serveur en ligne !");
});
