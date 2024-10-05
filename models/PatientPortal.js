const mongoose = require("mongoose");

const patientPortalSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  portalAccess: Boolean,
  accessDate: Date,
});

module.exports = mongoose.model("PatientPortal", patientPortalSchema);
