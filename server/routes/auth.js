const router = require("express").Router();
const passport = require("passport");
const { getUserByUserName } = require("../helpers/user");
const CLIENT_URL = "http://localhost:3000/home";
const CLIENT_LOGIN_URL = "http://localhost:3000";
const uuid = require("uuid");

router.get("/login/success", async (req, res) => {
  if (req.user) {
    let userName = "";
    if (req.user.emails) {
      userName = req.user.emails[0].value;
    } else if (req.user.username) {
      userName = req.user.username;
    } else {
      userName = req.user.userName
    }
    const userRes = await getUserByUserName({ userName });
    
    res.status(200).json({
      success: true,
      message: "successfull",
      user: userRes,
      //   cookies: req.cookies
      //if we are using jwt we can send the jwt here
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_LOGIN_URL);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.post("/auth/local/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  if (password.length < 8) {
    req.flash("error", "Account not created. Password must be 7+ characters long");
    return res.redirect("/local/signup");
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await addLocalUser({
      id: uuid.v4(),
      email,
      firstName: first_name,
      lastName: last_name,
      password: hashedPassword
    })
  } catch (e) {
    req.flash("error", "Error creating a new account. Try a different login method.");
    res.redirect("/local/signup")
  }
  res.redirect("/local/signin")
});

router.post("/local/signin",
  passport.authenticate("local", {
    successRedirect: "/login/success",
    failureRedirect: "/local/signin",
    //failureFlash: true
  }) 
);

module.exports = router;
