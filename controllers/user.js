const User = require("../models/user");

exports.addUser = (req, res) => {
  const user = new User(req.body.name, req.body.email);

  user
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.getUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      console.log("error", e);
    });
};
