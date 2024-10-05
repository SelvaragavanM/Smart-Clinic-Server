const mongoose = require("mongoose");

const medicalTestSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  testName: { type: String, required: true },
  date: { type: Date, required: true },
  result: { type: String, required: true },
});

module.exports = mongoose.model("MedicalTest", medicalTestSchema);
