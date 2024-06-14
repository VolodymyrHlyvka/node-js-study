const User = require("../models/user");

exports.addUser = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      console.log("error", e);
    });
};
