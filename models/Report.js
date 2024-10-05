const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  reportType: String,
  details: String,
  date: Date,
});

module.exports = mongoose.model("Report", reportSchema);
