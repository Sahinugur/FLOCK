const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const corsOptions = require("../server/middleware/security");
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const path = require("path");

const usersRoute = require("./routes/usersRoute");
const postRoute = require("./routes/postRoute");
const projectRoute = require("./routes/projectRoute");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const emailRouter = require("./routes/confirmations.js");
const cookieSession = require("cookie-session");
const { mainErrorHandler } = require("./middleware/errorHandler");
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
app.use("/projects", projectRoute);
//Test images folder connection
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//

/**MAIN ERROR HANDLER */
app.use(mainErrorHandler);

/**SETUP SERVER */
const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server is up and running on port: http://localhost:${port}`);
});
