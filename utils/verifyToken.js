import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

export const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};
export const verifyTokenAndAdminAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === admin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};
