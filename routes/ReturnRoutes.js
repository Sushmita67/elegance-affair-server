const express = require("express");
const router = express.Router();
const returnController = require("../controller/ReturnController");

// Return Routes
router.get("/:orderId", returnController.getReturnsByOrder); // Get returns for an order
router.get("/", returnController.viewReturns); // View all return requests
router.post("/", returnController.requestReturn); // Create a return request
router.put("/:id", returnController.updateReturn); // Update return status
router.delete("/:id", returnController.deleteReturn); // Delete return request

module.exports = router;
