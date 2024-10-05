const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  patientName: {
    type: String,
    required: true,
  },
  medication: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
