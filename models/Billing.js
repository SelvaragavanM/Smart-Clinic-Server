const mongoose = require("mongoose");

const BillingItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const BillingSchema = new mongoose.Schema({
  invoiceDate: { type: Date, required: true },
  billingPeriod: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  patientDetails: {
    name: { type: String, required: true },
    patientId: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
  },
  items: [BillingItemSchema],
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model("Billing", BillingSchema);
