const express = require("express");
const router = express.Router();
const inventoryController = require("../controller/InventoryController");

// Inventory Routes
router.get("/", inventoryController.getAllInventory); // Get all inventory items
router.put("/:id", inventoryController.addInventory); // Update inventory item

module.exports = router;
