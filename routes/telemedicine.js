const express = require("express");
const router = express.Router();
const Telemedicine = require("../models/Telemedicine");

// Get all telemedicine sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await Telemedicine.find()
      .populate("patientId")
      .populate("doctorId");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a telemedicine session by ID
router.get("/:id", async (req, res) => {
  try {
    const session = await Telemedicine.findById(req.params.id)
      .populate("patientId")
      .populate("doctorId");
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new telemedicine session
router.post("/", async (req, res) => {
  const session = new Telemedicine(req.body);
  try {
    const newSession = await session.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a telemedicine session
router.patch("/:id", async (req, res) => {
  try {
    const updatedSession = await Telemedicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a telemedicine session
router.delete("/:id", async (req, res) => {
  try {
    await Telemedicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Telemedicine session deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
