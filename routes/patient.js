const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");

// POST request to add a new patient
router.post("/", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// GET request to fetch all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});

module.exports = router;
