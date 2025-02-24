// authMiddleware.js
const jwt = require('jsonwebtoken');

const jwt = require("jsonwebtoken")

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role}, "my-secret", { expiresIn: "30s" })
}

const verify = (token) => {
  return jwt.verify(token, "my-secret");
}

module.exports = { generateToken, verify }
