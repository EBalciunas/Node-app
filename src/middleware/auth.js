import jwt from "jsonwebtoken";

const Auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "bad auth." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "bad auth." });
    }

    req.user = {
      email: decoded.email,
      id: decoded.id,
    };

    next();
  });
};

export default Auth;
