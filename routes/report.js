const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().populate("patientId");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate("patientId");
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new report
router.post("/", async (req, res) => {
  const report = new Report(req.body);
  try {
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a report
router.patch("/:id", async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a report
router.delete("/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
