const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const login = async (req, resp) => {
  try {
    const body = req.body;
    const config = {
      jwt: {
        secret: "LPU@summer-training-2025",
        expiresIn: "24h",
      },
    };

    let userData = await authModel.login(body.email, body.password);
    let msg = "";
    if (!userData || userData.length === 0) {
      return resp.status(401).json({
        success: false,
        message: "User doesn't exist in database",
      });
    } else {
      // After successful login, generate JWT token
      const token = jwt.sign(
        { userId: userData.id, email: userData.email },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );
      return resp.status(200).json({
        success: true,
        message: "Login successful",
        loginData: userData,
        token,
      });
    }
  } catch (error) {
    throw error;
  }
};

const signup = async (req, resp) => {
  try {
    const body = req.body;
    const user = await authModel.signup(
      body.email,
      body.password,
      body.mobile,
      body.usertype
    );
    return resp.status(201).json({
      success: true,
      message: "Signup successful",
      user,
    });
  } catch (error) {
    return resp.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  signup,
};
