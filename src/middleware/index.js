const jwt = require("jsonwebtoken");
const { AUTHORIZATION_REQUIRED, ADMIN_ALL_ACCESS_DENIED, 
    SUCCESSFULLY, AUTHORIZATION_EXPIRE } = require("../constant/index");

exports.checkToken = (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (jwt.decode(token).exp < Date.now() / 1000) {
      return res.status(400).json({ message: AUTHORIZATION_EXPIRE });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) return res.status(400).json({ message: AUTHORIZATION_REQUIRED });
      if (user) {
        return res.status(201).json({ message: SUCCESSFULLY });
      } else {
        return res.status(400).json({ message: AUTHORIZATION_REQUIRED });
      }
    });
  } else {
    return res.status(400).json({ message: AUTHORIZATION_REQUIRED });
  }
};

exports.checkAuthorized = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (jwt.decode(token).exp < Date.now() / 1000) {
      return res.status(400).json({ message: AUTHORIZATION_EXPIRE });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) return res.status(400).json({ message: AUTHORIZATION_REQUIRED });
      if (user) {
        req.user = user;
        next();
        jwt.decode()
      } else {
        return res.status(400).json({ message: AUTHORIZATION_REQUIRED });
      }
    });

  } else {
    return res.status(400).json({ message: AUTHORIZATION_REQUIRED });
  }
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin" ) {
    return res.status(400).json({ message: ADMIN_ALL_ACCESS_DENIED });
  }
  next();
};
