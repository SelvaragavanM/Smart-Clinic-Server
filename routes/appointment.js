const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// Get an appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (err) {
    console.error("Error fetching appointment by ID:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// Create a new appointment
router.post("/", async (req, res) => {
  const { name, date, time, phone } = req.body;
  if (!name || !date || !time || !phone) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const appointment = new Appointment({ name, date, time, phone });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(400).json({ message: "Bad Request", error: err.message });
  }
});

// Update an appointment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(400).json({ message: "Bad Request", error: err.message });
  }
});

// Delete an appointment by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("Error deleting appointment:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
