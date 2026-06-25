const User = require("../models/User");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    console.log("Register API Hit");

    const { name, email, password } = req.body;

    console.log(req.body);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Password hashed successfully");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
};
