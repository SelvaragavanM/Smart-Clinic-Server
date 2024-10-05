const express = require("express");
const router = express.Router();
const MedicalTest = require("../models/MedicalTest"); // Adjust the path as needed

// GET all medical tests
router.get("/", async (req, res) => {
  try {
    const tests = await MedicalTest.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new medical test
router.post("/", async (req, res) => {
  const { patientName, testName, date, result } = req.body;
  const newTest = new MedicalTest({
    patientName,
    testName,
    result,
    date,
  });

  try {
    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update an existing medical test
router.put("/:id", async (req, res) => {
  try {
    const updatedTest = await MedicalTest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a medical test
router.delete("/:id", async (req, res) => {
  try {
    await MedicalTest.findByIdAndDelete(req.params.id);
    res.json({ message: "Medical test deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
