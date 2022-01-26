const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const {addOAuth2User,
  addLocalUser,
  getUsers,
  getUserByUserName,} = require('./helpers/user')

const GOOGLE_CLIENT_ID =
"716035793032-s745h1q28qc28uc666v87dlqitdmeio8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "ab306cc61fbc37ecf745";
GITHUB_CLIENT_SECRET = "d19a02590b3976146eda465d4a3b41562364ec07";


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    //strategy with DB (instead of cb there is done)
    //profile:username,user id ,profile pic...
    async  (accessToken, refreshToken, profile, done) => {
      
      const id = profile.id;
      const email = profile.emails[0].value;
      const userName = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;
      const source = "google";
      const isVerified = true;

      const currentUser = await getUserByUserName({ userName })

      if (!currentUser) {
        const newUser = await addOAuth2User({
          id,
          userName,
          email,
          firstName,
          lastName,
          profilePhoto,
          source,
          isVerified
        })
        return done(null, newUser);
      }

      if (currentUser.source != "google") {
        //return error
        return done(null, false, { message: `You have previously signed up with a different signin method` });
      }

      currentUser.lastVisited = new Date();
      currentUser.isVerified=true;
  

      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(`profile`, profile);
      const id = profile.id;
      const email = JSON.parse(profile._raw).email;
      const userName = profile.username;
      const firstName = profile.displayName;
      const lastName = '';
      const profilePhoto = profile.photos[0].value;
      const source = "github";

      const currentUser = await getUserByUserName({ userName })

      if (!currentUser) {
        const newUser = await addOAuth2User({
          id,
          userName,
          email,
          firstName,
          lastName,
          profilePhoto,
          source
        })
        return done(null, newUser);
      }

      if (currentUser.source != "github") {
        //return error
        return done(null, false, { message: `You have previously signed up with a different signin method` });
      }

      currentUser.lastVisited = new Date();
      done(null, profile);
    }
  )
);

/* passport.use(new LocalStrategy(
  async function (userName, password, done) {
    const currentUser = await getUserByUserName({ userName })
    console.log(`currentUser`, currentUser);
    //console.log('success');
   if (!currentUser) {
      return done(null, false, { message: `User with email ${email} does not exist` });
    }

    if (currentUser.source != "local") {
      return done(null, false, { message: `You have previously signed up with a different signin method` });
    }

    if (!bcrypt.compareSync(password, currentUser.password)) {
      return done(null, false, { message: `Incorrect password provided` });
    } 
    return done(null, currentUser);
  }
));
 */

//because we are using sessions we should serialize and deserialize users
passport.serializeUser((user, done) => {
  done(null, user);
  //if we are using DB:
  /* const user={
    username :profile.displayName,
    avatar:profile.photos[0]
  } */
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
