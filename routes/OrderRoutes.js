const express = require("express");
const router = express.Router();
const orderController = require("../controller/OrderController");

// Order Routes
router.get("/", orderController.getAllOrders); // Get all orders
router.get("/:id", orderController.getOrdersByUser); // Get order by ID
router.post("/", orderController.createOrder); // Create new order
router.put("/:id", orderController.updateOrderStatus); // Update order status
router.delete("/:id", orderController.deleteOrder); // Delete order

module.exports = router;
