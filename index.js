const { createServer } = require("node:http");
var url = require("url");

const { handler } = require("./routes");

const hostname = "127.0.0.1";
const port = 3000;
const server = createServer(handler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
