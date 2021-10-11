const Users = require("../models/users");
const Songs = require("../models/songs");

//Import bcrypt
const bcrypt = require("bcrypt");

exports.getIndex = (req, res, next) => {
  res.render("musicIndex/index.ejs", {
    pageTitle: "Yari | My Music App",
    path: "/",
    users: "",
    isAuthenticated: req.session.isLogged
  });
};

exports.getCreateAccount = (req, res, next) => {
  res.render("auth/login.ejs", {
    path: "/login",
    pageTitle: "Yari | My Music App | Login",
  });
};

exports.postCreateAccount = (req, res, next) => {
  const user = {
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmpassword,
  };
  Users.findOne({
    $or: [{ userName: user.userName }, { email: user.email }],
  })
    .then((userDoc) => {
      if (userDoc) {
        console.log("User or Email already exists ");
        return res.redirect("/login");
      }
      return bcrypt.hash(user.password, 12);
    })
    .then((hashedPassword) => {
      const users = new Users({
        userName: user.userName,
        email: user.email,
        password: hashedPassword,
      });
      users.save();
    })
    .then((result) => {
      res.render("auth/login.ejs", {
        path: "/login",
        pageTitle: "Yari | My Music App | Login",
        users: user,
        isAuthenticated: false

      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postLogin = (req, res, next) => {
  req.session.isLogged = true;
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((doMatch) => {
          if (doMatch) {
            req.session.userId = user._id;
            return res.redirect("/myMusic");
          } else {
            res.redirect("/login");
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getMyMusicPlaylist = (req, res, next) => {
  const id = req.session.userId
  Songs.find({userId: id})
  .then((mySongs) => {
    res.render("musicIndex/mymusicplaylist.ejs", {
      pageTitle: "Yari | My Music Playlist",
      path: "/myMusic",
      users: '',
      songs: mySongs,
      isAuthenticated: req.session.isLogged
    });
    
  });
};

exports.postMyMusicPlaylist = (req, res, next) => {
  const song = {
    songTitle: req.body.songtitle,
    band: req.body.band,
    songFile: req.files["songfile"][0],
    cover: req.files["cover"][0],
  };


  const cover = song.cover.path;
  const songFile = song.songFile.path;

  const songs = new Songs({
    songTitle: song.songTitle,
    band: song.band,
    songFile: songFile,
    cover: cover,
    userId: req.session.userId
  });
  songs
    .save()
    .then((result) => {
      res.redirect("/myMusic");
    })
    .then((result) => {
      res.redirect("/myMusic");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) =>{
  req.session.destroy(()=>{
    res.redirect('/')
  })
}
