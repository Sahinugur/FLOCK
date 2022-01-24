const mongoose = require("mongoose");
const UserSchema = require("../models/User");
require("dotenv").config();

const connectionString = process.env.DB_URL;
function connect() {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) {
      resolve();
    } else {
      mongoose
        .connect(connectionString, {
          useUnifiedTopology: true,

          useNewUrlParser: true,
        })
        .then(() => resolve())
        .catch((error) => {
          reject(error);
        });
    }
  });
}
const confirmEmailAndUpdate = async (id) => {
    await connect();
    const user = await UserSchema.findByIdAndUpdate({ _id: id }, { verified: true });
  };
module.exports={connect,confirmEmailAndUpdate}