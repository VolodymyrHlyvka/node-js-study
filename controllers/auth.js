const bcrypt = require("bcryptjs");

const Users = require("../models/user");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../controllers/jwt-token");

exports.login = (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .select("_id email password")
    .then((user) => {
      if (user) {
        return bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (doMatch) {
              const { password, ...userWithoutPassword } = user.toObject();
              const accessToken = generateAccessToken(userWithoutPassword);
              const refreshToken = generateRefreshToken(userWithoutPassword);
              return res.send({ accessToken, refreshToken });
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
  // to work with csrf we should add _csrf input into our request (input type="hidden" name="_csrf" value={req.csrfToken()})
  // or X-XSRF-TOKEN header with value={req.csrfToken()}
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to destroy session");
    }

    // Clear the cookie from the client side
    res.clearCookie("connect.sid", { path: "/" });
    res.send("User has been successfully logged out");
  });
};

exports.token = (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.generateAccessToken(user);
    res.json({ accessToken });
  });
};
