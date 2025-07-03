const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // ✅ Access the correct header (case-insensitive)
    const authHeader = req.headers.authorization;

    // ✅ Check for proper format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing or invalid",
      });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    // ✅ Verify token using correct secret
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorize User",
          err,
        });
      }

      // ✅ Token is valid, attach decoded user ID to request
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    return res.status(500).send({
      success: false,
      message: "Auth Middleware Exception",
      error,
    });
  }
};
