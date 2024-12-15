const express = require("express");
const verifyToken = require("../middleware/authMiddleWare");
const authorizeRole = require("../middleware/roleMiddleWare");

const router = express.Router();

router.post("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  return res.status(200).json({ message: "Hello, Admin!" });
});
router.post(
  "/manager",
  verifyToken,
  authorizeRole("admin", "manager"),
  (req, res) => {
    return res.status(200).json({ message: "Hello, Manager!" });
  }
);
router.post(
  "/user",
  verifyToken,
  authorizeRole("admin", "manager", "user"),
  (req, res) => {
    return res.status(200).json({ message: "Hello, User!" });
  }
);

module.exports = router;
