const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res
      .status(404)
      .json({ message: "No token found, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log("The decoded user is :", req.user);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token not valid" });
  }
};

module.exports = verifyToken;
