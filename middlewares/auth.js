const prisma = require("../config/prisma");
const jsonwebtoken = require("jsonwebtoken");

class AuthMiddleware {
  async authenticate(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) return res.status(401).send("Token missing");

      console.log("Authenticating token: ", token);

      const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);

      const email = decodedToken.email;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) return res.status(403).send("User not found");

      req.user = user;

      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(500).send("Authentication error");
    }
  }
}

module.exports = new AuthMiddleware();
