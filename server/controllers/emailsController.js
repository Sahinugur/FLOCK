const UserSchema = require("../models/User");

async function emailController(req, res, next) {
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
          `Hi ${confirmed.userName} thank you for your email confirmation ,please click on the link below to login`
        );
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { emailController };
