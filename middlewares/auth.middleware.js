const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const theToken = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(theToken, process.env.TOKEN_SECRET);
    req.payload = data;
    next();
  } else {
    res.status(403).json({ message: "headers malformed" });
  }
};
module.exports = authenticateUser;