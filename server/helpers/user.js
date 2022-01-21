const userSchema = require("../models/User");
 
async function addOAuth2User({ id, userName, email, firstName, lastName, profilePhoto, source }){
    console.log(id, email, firstName, lastName, profilePhoto);

    const user = await new userSchema({
      id,
      userName,
      email,
      firstName,
      lastName,
      profilePhoto,
      source: source,
    });
    user.save();
    return  user;
  };
/* const addLocalUser =
  () =>
  ({ id, email, firstName, lastName, password }) => {
    const user = new User({
      id,
      email,
      firstName,
      lastName,
      password,
      source: "local",
    });
    return user.save();
  };
 */

 
async function getUserByUserName({ userName }) {
    return await userSchema.findOne({ userName });
};

module.exports = {
  addOAuth2User,
  getUserByUserName,
};
