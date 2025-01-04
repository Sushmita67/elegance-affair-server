const express = require("express");
const router = express.Router();
const wishlistController = require("../controller/WishlistController");

// Wishlist Routes
router.get("/:userId", wishlistController.viewWishlist); // Get wishlist for a user
router.post("/", wishlistController.addToWishlist); // Add product to wishlist
router.delete("/:wishlistId", wishlistController.removeFromWishlist); // Remove product from wishlist

module.exports = router;
