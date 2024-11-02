const jwt = require("jsonwebtoken");
const secret = "this is secret";

module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
  console.log(req.cookies);
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};
