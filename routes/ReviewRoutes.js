const express = require("express");
const router = express.Router();
const reviewController = require("../controller/ReviewController");

// Review Routes
router.get("/:productId", reviewController.getReviewsByProduct); // Get reviews for a specific product
router.post("/", reviewController.addReview); // Create new review
router.put("/:id", reviewController.updateReview); // Update review
router.delete("/:id", reviewController.deleteReview); // Delete review

module.exports = router;
