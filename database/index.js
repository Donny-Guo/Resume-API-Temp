const moogoose = require("mongoose");

// function to connect to MongoDB
function connectDB() {
  moogoose
    .connect(process.env.MONGO_URI)
    .then((_) => console.log("MongoDB Connected"))
    .catch((err) => console.warn(err));
}

module.exports = { connectDB };