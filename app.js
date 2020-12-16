//Core Modules
const path = require("path");

// Third Modules
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
//Database Connection
const mongoDB = require("mongodb");
const mongoose = require("mongoose");

//Import Routes
const userRoutes = require("./router/usersRoutes");

// Enable express application
const app = express();
const port = 5500;

// Configure EJS templates
app.set("view engine", "ejs");
app.set("views", "views");

//Configure Multer Disk Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
//Filter Multer Files With Mime Type
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    console.log('Invalid File Extension')
  }
};

// Use Body Parser, Express Static, Multer
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("cover"));
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));


//Express Router
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).render("404.ejs", { pageTitle: "Page Not Found" });
});

mongoose
  .connect(
    "mongodb+srv://yarishred:959XRCH0oaXejU5r@cluster0.vhvmi.mongodb.net/musicdb?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
