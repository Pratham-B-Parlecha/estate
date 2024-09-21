import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  return res.status(200).json({ message: "You are authenticated" });
};
export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenicated" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "not authorized" });
    }
  });
  return res.status(200).json({ message: "You are authenticated" });
};
