const express = require("express");
const router = express.Router();
const cartController = require("../controller/CartController");

// Cart Routes
router.get("/:userId", cartController.getCartByUser); // Get cart for a user
router.post("/", cartController.addToCart); // Add product to cart
router.post("/:cartId", cartController.viewCart); // Add product to cart
router.put("/:cartId", cartController.updateCartItem); // Update cart item
router.delete("/:cartId", cartController.removeFromCart); // Remove item from cart

module.exports = router;
