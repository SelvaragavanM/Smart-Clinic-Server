const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

// Get all inventory items with pagination and filters
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, category = "", search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    const query = {
      ...(category && { category }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    const total = await Inventory.countDocuments(query);
    const items = await Inventory.find(query)
      .skip(Number(skip))
      .limit(Number(limit));
    res.json({ items, total });
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res.status(500).json({ message: error.message });
  }
});

// Add a new inventory item
router.post("/", async (req, res) => {
  const { name, category, quantity, unitPrice } = req.body;

  const newItem = new Inventory({
    name,
    category,
    quantity,
    unitPrice,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving new inventory item:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update an existing inventory item
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, unitPrice } = req.body;

  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { name, category, quantity, unitPrice },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete an inventory item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Inventory.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
