const http = require('http');

const server = http.createServer((req, res) => {
  res.write("Hello Claudia");
  res.end();
}).listen(80);

