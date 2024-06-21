const Users = require("../models/user");

exports.addUser = (req, res) => {
  const { name, email } = req.body;
  const user = new Users({ name, email });

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
  Users.findById(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      console.log("error", e);
    });
};
