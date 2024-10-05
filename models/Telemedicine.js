const mongoose = require("mongoose");

const telemedicineSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  sessionLink: String,
  date: Date,
});

module.exports = mongoose.model("Telemedicine", telemedicineSchema);
