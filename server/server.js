const express = require("express");
const app = express();

const http = require("http");

/** Include routers */
const postRouter = require("./router/postRouter");

/** Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Routers */
app.use("/post", postRouter);

const server = http.createServer(app);

const PORT = process.env.port || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`);
});
