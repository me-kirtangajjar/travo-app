const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const user = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    };

    const newUser = await User.create(user);

    return res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

router.get("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ status: true, message: "User logged in successfully", token });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
