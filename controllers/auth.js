const Users = require("../models/user");

exports.login = (req, res) => {
  const { name } = req.body;
  Users.findOne({ name })
    .then((user) => {
      //   res
      //     .cookie("loggedIn", "true", { maxAge: 900000, httpOnly: true })
      if (user) {
        req.session.isLogged = true;
        req.session.user = user;
        res.send(user);
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.send("User has been successfully logout");
};
