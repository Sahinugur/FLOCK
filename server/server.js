const express = require("express");
const app = express();

const http = require("http");

const server = http.createServer(app);

const PORT = process.env.port || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`);
});
