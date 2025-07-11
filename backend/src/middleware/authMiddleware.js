const authMiddleware = (req, resp, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return resp.status(401).json({
      success: false,
      message: "No token provided",
    });
  }   
  jwt.verify(token, "LPU@summer-training-2025", (err, decoded) => {
    if (err) {
      return resp.status(401).json({
        success: false,
        message: "Failed to authenticate token",
      });
    }
    req.user = decoded; // Store user info in request object
    next(); // Proceed to the next middleware or route handler
  });
}