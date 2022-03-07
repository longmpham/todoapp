const mongoose = require("mongoose");

const connectDB = () => {
    // todo: get ENV to work so i dont push my creds.
    const uri = "mongodb+srv://long:long@cluster0.enwkp.mongodb.net/learnmern?retryWrites=true&w=majority"
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "mongodb connection error:"));
    db.once("open", () => {
      console.log("You've Connected Successfully To Your DB");
    });
    db.on('disconnected', function () {
      console.log('Mongoose Disconnected');
    });
}

module.exports = connectDB