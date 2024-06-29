// now we can add session check to any routes we want
module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).send("No active session");
  }
  next();
};
