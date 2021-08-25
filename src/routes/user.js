const express = require("express");
const router = express.Router();

// User model
const User = require("../../models/User");
// Login page
router.get("", (req, res) => res.render("login"));

// Register page
router.get("/register", (req, res) => res.render("register"));

// Logout Page
router.get("/logout", (req, res) => res.render("logout"));

// Register Handler
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  {
    const newUser = new User({
      name,
      email,
      password,
      password2,
    });
    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
});

// Login Handle
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.redirect("/news");
        }
      }
    }
  });
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
