const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Booking endpoint to save doctor details
router.post("/book", async (req, res) => {
  try {
    const { name, specialty, phone, email } = req.body;
    const newBooking = new Doctor({
      name,
      specialty,
      phone,
      email,
    });
    await newBooking.save();
    res.status(201).json({ message: "Doctor booked successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to book doctor", error });
  }
});

module.exports = router;
