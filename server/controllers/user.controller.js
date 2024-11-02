const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt.config");

module.exports.register = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res
        .cookie("usertoken", jwt.sign({ _id: user._id }, secret), {
          httpOnly: true,
        })
        .json({ msg: "success", user: user });
    })
    .catch((err) => console.log(err));
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user == null) {
        res.json({ msg: "Invalid login attempt" }); //email is not found
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((passwordIsValid) => {
            if (passwordIsValid) {
              res
                .cookie("usertoken", jwt.sign({ _id: user._id }, secret), {
                  httpOnly: true,
                })
                .json({ msg: "success!" });
            } else {
              res.json({ msg: "Invalid login attempt" }); //incorrect password
            }
          })
          .catch((err) => res.json({ msg: "Invalid login attempt", err }));
      }
    })
    .catch((err) => res.json(err));
};

module.exports.getLoggedInUser = (req, res) => {
  const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
  User.findById(decodedJWT.payload._id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports.updatePassword = (request, response) => {
  var user = new User(request.body);
  User.findOne({ _id: user._id })
    .then((res) => {
      res
        .updateOne(res, user)
        .then((r) => response.json(r))
        .catch((err) => response.json(err));
    })
    .catch((err) => response.json(err));
};

module.exports.logout = (req, res) => {
  res.clearCookie("usertoken");
  res.sendStatus(200);
};

module.exports.getUserById = (request, response) => {
  User.findOne({ _id: request.params.id })
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

module.exports.getUserByEmail = (request, response) => {
  User.findOne({ email: request.params.email })
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

module.exports.getAllPeople = (request, response) => {
  User.find({})
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
};

module.exports.updateUser = (request, response) => {
  User.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
  })
    .then((updatedUser) => response.json(updatedUser))
    .catch((err) => response.json(err));
};

module.exports.deleteUser = (request, response) => {
  User.deleteOne({ _id: request.params.id })
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};
