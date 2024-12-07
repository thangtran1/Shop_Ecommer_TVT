const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI);
    if (con.connection.readyState === 1) {
      console.log("dbConnection is success!!!");
    } else {
      console.log("dbConnect connecting");
    }
  } catch (e) {
    console.log("dbConnect failed: ", e);
    throw new Error(e);
  }
};

module.exports = dbConnect;
