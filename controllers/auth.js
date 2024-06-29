const Users = require("../models/user");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        return bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (doMatch) {
              req.session.isLogged = true;
              req.session.user = user;
              return req.session.save(() => {
                res.send(user);
              });
            }
            return res.send("Email or password are incorrect");
          })
          .catch((e) => {
            console.log("bcrypt.compare error", e);
          });
      }
      res.status(404).send("Not found");
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.register = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email })
    .then((user) => {
      if (user) {
        return res.send("User already exists");
      }
      return bcrypt.hash(password, 12).then((hassedPassword) => {
        const newUser = new Users({ email, password: hassedPassword });
        newUser
          .save()
          .then((user) => {
            res.send(user);
          })
          .catch((e) => {
            console.log("error", e);
          });
      });
    })
    .catch((e) => {
      console.log("error", e);
    });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.send("User has been successfully logout");
};
