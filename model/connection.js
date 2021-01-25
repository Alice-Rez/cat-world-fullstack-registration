let mongoose = require("mongoose");

let url = process.env.MONGODB_URI;

// we are creating connection function - we will not create new connection for each query, but we will let one for the whole time
// function checks if there exist some connection and if yes, it will use that.....
function connect() {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) {
      resolve();
    } else {
      mongoose
        .connect(url, {
          useCreateIndex: true,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

module.exports = connect;
