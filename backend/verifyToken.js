const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  // if authorization is empty
  if (!authorization)
    return res.status(403).json({ error: { message: "Forbidden" } });
  //  split the authorization
  const token = authorization.split(" ")[1];
  //  verify the token
  jwt.verify(token, process.env.JWT_KEY, (error, tokenData) => {
    if (error) return res.status(403).json({ error });
    req.user = tokenData.user;
    next();
  });
}

module.exports = verifyToken;
