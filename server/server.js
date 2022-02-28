const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const corsOptions = require("../server/middleware/security");
const cors = require("cors");
const path = require("path");

//Socket.io
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./helpers/users");

const socketRoute = require("./routes/socketRoute");
const usersRoute = require("./routes/usersRoute");
const postRoute = require("./routes/postRoute");
const projectRoute = require("./routes/projectRoute");
const passportSetup = require("./passport");
const roomRoute = require("./routes/roomRoute");
const passport = require("passport");
const authRoute = require("./routes/auth");
const emailRouter = require("./routes/confirmations.js");
const cookieSession = require("cookie-session");
const { mainErrorHandler } = require("./middleware/errorHandler");
const eventRoute = require("./routes/eventRoute");
/*Middlewares*/

app.use(cors(corsOptions));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    headers: "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["flock"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

/**SETUP PASSPORT JS */
app.use(passport.initialize());
app.use(passport.session());

/*SETUP DATABASE*/
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("connection err: ", err.message);
});
mongoose.connection.once("open", () => {
  console.log("connection with MongoDB established successfully!");
});

/**ROUTES */
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/confirm", emailRouter);
app.use("/posts", postRoute);
app.use("/room", roomRoute);
app.use("/events", eventRoute);
app.use("/events/", socketRoute);

app.use("/projects", projectRoute);
//Test images folder connection
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Image providing
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**MAIN ERROR HANDLER */
app.use(mainErrorHandler);

/**SETUP SERVER */
const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server is up and running on port: http://localhost:${port}`);
});

/* SETUP SOCKET.IO */
const io = socketIo(server, { cors: { origins: "http://localhost:3000" } });

io.on("connection", (socket) => {
  socket.on("join", ({ name, id }, callback) => {
    const { error, user } = addUser({ userId: socket.id, name, id });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to event ${user.id}`,
    });

    socket.broadcast
      .to(user.id)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    socket.join(user.id);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.id).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.id).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.id).emit("roomData", {
        id: user.id,
        users: getUsersInRoom(user.id),
      });
    }
  });
});
