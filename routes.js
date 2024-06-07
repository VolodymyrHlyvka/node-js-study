var fs = require("fs");

function urlsHandler(req, res) {
  if (req.url === "/") {
    fs.readFile("./summer.html", function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }
}

// How to export
module.exports = urlsHandler;

module.exports = {
  handler: urlsHandler,
};
module.exports.handler = urlsHandler;
exports.handler = urlsHandler;
