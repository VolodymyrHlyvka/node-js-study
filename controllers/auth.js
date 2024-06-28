exports.login = (req, res) => {
  //   res
  //     .cookie("loggedIn", "true", { maxAge: 900000, httpOnly: true })
  req.session.isLogged = true;
  req.session.user = req.user;
  res.send(req.user);
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.send('User has been successfully logout');
};
