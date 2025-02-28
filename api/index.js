const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");

//recup user model - database
const User = require("./models/User");
const Post = require("./models/Post");

//bcrypt
const salt = bcrypt.genSaltSync(10);

//JWT
const jwt_secret = "jloiztydddiygdsdsqkhsyqudfshdihyfsh";

//multer pour les images
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cookieParser());

//static uploads image
app.use("/uploads", express.static(__dirname + "/uploads"));

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

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
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      res.status(401).json({ message: "Pas de connexion, réessayer!" });
      // res.json({ message: "ECHEC PAPA" });
      return;
    }
    const verifyPass = bcrypt.compareSync(password, userDoc.password);
    if (!verifyPass) {
      res.status(400).json({ message: "Pas de connexion MDP, réessayer!" });
      // res.json({ message: "ECHEC PAPA" });
      return;
    } else {
      //logged and create token
      jwt.sign(
        { username, userId: userDoc._id },
        jwt_secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            token,
            username,
            userId: userDoc._id,
          });
          // console.log("login ok");
        }
      );
      // const expiryDate = new Date(Date.now() + 3600000); //1 heure de connexion
      // const tokenValid = jwt.sign({ id: userDoc._id }, jwt_secret, {
      //   expiresIn: "12h",
      // }); //on va utiliser les cookies
      // res.status(200).json({
      //   token: tokenValid,
      //   username,
      //   userId: userDoc._id,
      // });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

//page profile user
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwt_secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

//page logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok logout");
});

//poster article
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;

  jwt.verify(token, jwt_secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.userId,
    });
    res.json(postDoc);

    // console.log(info.id);
  });
});

//modifier article
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    newPath = path + "." + extension;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, jwt_secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor =
      JSON.stringify(postDoc.author) === JSON.stringify(info.userId);
    if (!isAuthor) {
      return res.status(400).json("Vous n'etes pas l'auteur de l'article !");
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json({ postDoc });
  });
});

//afficher les posts
app.get("/post", async (req, res) => {
  // const posts = await Post.find();
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

//details un post avec son id
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

//test
app.get("/test", (req, res) => {
  res.send("hello MAMAN");
});

//lancement serveur
app.listen(4000, () => {
  console.log("serveur en ligne !");
});
