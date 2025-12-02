import { errorHadler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //verifyToken =verifyUser
  const token = req.cookies.access_token;

  if (!token) return next(errorHadler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHadler(403, "Token is not valid and Forbidden"));

    req.user = user;
    next();
  });
};
