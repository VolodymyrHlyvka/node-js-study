exports.login = (req, res) => {
  res
    .cookie("loggedIn", "true", { maxAge: 900000, httpOnly: true })
    .send(req.user);
};

exports.logout = (req, res) => {
  const isLogged = false;
  res.send(req.user);
};
