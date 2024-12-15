const authorizeRole = (...allowedRole) => {
  return (req, res, next) => {
    if (!allowedRole.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You don have have access to this credential" });
    }
    next();
  };
};

module.exports = authorizeRole;
