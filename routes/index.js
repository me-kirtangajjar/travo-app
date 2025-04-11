const router = require("express").Router();
const User = require("../models/user.model");
const Itinerary = require("../models/itinerary.model");

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

    return res.status(200).json({
      status: true,
      message: "User logged in successfully",
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

router.post("/itineraries", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const itinerary = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
    };
    const newItinerary = await Itinerary.create(itinerary);

    return res.status(200).json({
      status: true,
      message: "Itinerary saved successfully",
      data: newItinerary,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

router.get("/itineraries", async (req, res) => {
  try {
    const user = await Itinerary.find({ userId: req.body.userId });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Itineraries fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
