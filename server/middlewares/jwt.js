const jwt = require("jsonwebtoken");

const gennerateAccessToken = (uid, role) => {
  return jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

const gennerateRefreshToken = (uid) => {
  return jwt.sign({ _id: uid }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  gennerateAccessToken,
  gennerateRefreshToken,
};
