const express = require("express");
const router = express.Router();
const PatientPortal = require("../models/PatientPortal");

// Get all patient portals
router.get("/", async (req, res) => {
  try {
    const portals = await PatientPortal.find().populate("patientId");
    res.json(portals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a patient portal by ID
router.get("/:id", async (req, res) => {
  try {
    const portal = await PatientPortal.findById(req.params.id).populate(
      "patientId"
    );
    res.json(portal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new patient portal
router.post("/", async (req, res) => {
  const portal = new PatientPortal(req.body);
  try {
    const newPortal = await portal.save();
    res.status(201).json(newPortal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a patient portal
router.patch("/:id", async (req, res) => {
  try {
    const updatedPortal = await PatientPortal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPortal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a patient portal
router.delete("/:id", async (req, res) => {
  try {
    await PatientPortal.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient portal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
