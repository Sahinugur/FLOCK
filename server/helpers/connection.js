const mongoose = require("mongoose");
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
const confirmEmail = async (id) => {
    await connect();
    const user = await Users.findByIdAndUpdate({ _id: id }, { verified: true });
  };
module.exports={connect,confirmEmail}