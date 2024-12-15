const express = require("express");
const { register, logIn, logOut } = require("../controller/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.post("/logout", logOut);

module.exports = router;
