const UserSchema = require("../models/User");

async function emailController(req, res, next) {
  console.log('emailController');
  function redirect(){
    res.send('done')
  }
  try {
    let confirmed = await UserSchema.findOneAndUpdate(
      { _id: req.params.id },
      { verified: true }
    );
    if (confirmed) {
      if (confirmed.verified) {
        res.send("link already confirmed");
      } else {
        res.send(
          ` <h1> Hi ${confirmed.userName} thank you for your email confirmation ,please click on the link below to login</h1>
          <a onClick=${redirect} href="http://localhost:3000"> Got to home page</a>`
        );
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { emailController };
