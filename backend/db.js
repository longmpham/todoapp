const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongooseConnection = await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("You've Connected Successfully To Your DB");
  } catch (error) {
      console.log('Mongoose Did Not Connect:' + error);
  }
}

module.exports = connectDB