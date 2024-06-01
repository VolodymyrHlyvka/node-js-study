const { createServer } = require("node:http");
var url = require("url");
var fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;
const server = createServer((req, res) => {
  const q = url.parse(req.url, true);
  // console.log("req", q);
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "text/plain");
  // res.end("Hello World");
  fs.readFile('./summer.html', function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
