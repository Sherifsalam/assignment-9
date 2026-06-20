import { verifyToken } from "../security/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) return res.status(401).json({ message: "Token is required" });

    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
