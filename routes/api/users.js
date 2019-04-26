const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport')
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
//Load user model
const User = require("../models/User");

// @route GET api/users/test
// @desc Test user route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

// @route GET api/users/register
// @desc Register a user
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email alredy exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      //console.log(req.body)
      const { name, email, password } = req.body;
      const newUser = new User({
        name,
        email,
        avatar,
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route GET api/users/login
// @desc Login user / returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by emai;
  User.findOne({ email }).then(user => {
    if (!user) {
      res.status(404).json({ email: "User not found" });
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        //jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        //sign  Token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err,token) => {
            res.json({
                success : true,
                token : 'Bearer ' + token
            })
        });
      } else {
        res.status("400").json({ password: "Password incorrect" });
      }
    });
  });
});
module.exports = router;
