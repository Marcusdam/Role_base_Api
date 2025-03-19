const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const register = async (req, res) => {
  try {
    const { userName, password, role } = req.body;
    if (!userName || !password || !role) {
      return res.status(400).json({ message: "Please fill in all field" });
    }

    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, role, password: hashedPassword });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", userName });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to create new user", error });
  }
};

const logIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(404).json({ message: "All field are required" });
    }
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1hr" }
    );

    console.log(token);
    return res.status(200).json({
      message: "User logged in successfully",
      userName,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

const logOut = async (req, res) => {};

module.exports = {
  register,
  logIn,
  logOut,
};
