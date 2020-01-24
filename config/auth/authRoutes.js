// const axios = require("axios");
const Users = require("../auth/authModels.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate, generateToken } = require("../../auth/authenticate");

module.exports = server => {
  server.get("/", testServer);
  server.post("/api/register", register);
  server.post("/api/login", login);
};

///// SANITY CHECK //////
function testServer(req, res) {
  res.send(
    "<h1> Welcome to A to Z Backend!</h1>" +
      "<br/>" +
      "Built by: Leslie Thompson" +
      "<br />" +
      "<br />" +
      "GitHub: https://github.com/a-to-z-experiences/AtoZ_backend" +
      "<br />" +
      "<br />" +
      "Deployed Backend: https://atoz-backend.herokuapp.com"
  );
}

///// REGISTER /////
function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      const token = generateToken(newUser);
      console.log("TOKEN:", token);
      res.status(201).json({
        message: `Welcome ${user.username}! You have been successfully registered!`,
        newUser,
        token
      });
    })
    .catch(err => {
      console.log("register", err);
      res
        .status(500)
        .json({ message: "Sorry, but something went wrong while registering" });
    });
}

///// LOGIN /////
function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token
        const token = generateToken(user);

        res.status(200).json({
          user,
          message: `Welcome ${user.username}!`,
          token //return the token upon login
        });
      } else {
        res
          .status(401)
          .json({ message: "Wrong username or password. Try again." });
      }
    })
    .catch(error => {
      console.log("Login error", error);
      res
        .status(500)
        .json({ message: "Sorry, but something went wrong while logging in" });
    });
}
