const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");

// Get all prescriptions
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new prescription
router.post("/", async (req, res) => {
  const { patientName, medication, dosage, instructions, date } = req.body;
  const prescription = new Prescription({
    patientName,
    medication,
    dosage,
    instructions,
    date,
  });

  try {
    const newPrescription = await prescription.save();
    res.status(201).json(newPrescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a prescription
router.patch("/:id", async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPrescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a prescription
router.delete("/:id", async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.json({ message: "Prescription deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
