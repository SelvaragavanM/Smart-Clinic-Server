const express = require("express");
const router = express.Router();
const Billing = require("../models/Billing");

// Route to create a new billing entry
router.post("/", async (req, res) => {
  try {
    const { invoiceDate, billingPeriod, patientDetails, data } = req.body;
    console.log(req.body);
    // Calculate total amount
    const totalAmount = data.reduce((sum, item) => sum + item.totalPrice, 0);

    const billing = new Billing({
      invoiceDate,
      billingPeriod: {
        start: billingPeriod[0],
        end: billingPeriod[1],
      },
      patientDetails,
      items: data,
      totalAmount,
    });

    await billing.save();
    res.status(201).json(billing);
  } catch (error) {
    console.error("Error creating billing entry:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route to get all billing entries
router.get("/", async (req, res) => {
  try {
    const billings = await Billing.find();
    res.json(billings);
  } catch (error) {
    console.error("Error fetching billings:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
