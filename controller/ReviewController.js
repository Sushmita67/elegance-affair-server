const Review = require("../models/Review");
const Product = require("../models/Product");
const User = require("../models/User");

// Add a review for a product
const addReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;

        const product = await Product.findById(productId);
        const user = await User.findById(userId);

        if (!product || !user) {
            return res.status(404).json({ message: "Product or User not found." });
        }

        const newReview = new Review({
            productId,
            userId,
            rating,
            comment,
            date: new Date(),
        });

        await newReview.save();

        // Calculate new average rating for the product
        const reviews = await Review.find({ productId });
        const averageRating =
            reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

        product.averageRating = averageRating;
        await product.save();

        res.status(201).json({ message: "Review added successfully.", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Failed to add review.", error: error.message });
    }
};

// Get all reviews for a product
const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId }).populate("userId", "username");
        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this product." });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews.", error: error.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    try {
        const { reviewId, userId, rating, comment } = req.body;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        if (review.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to update this review." });
        }

        if (rating !== undefined) review.rating = rating;
        if (comment !== undefined) review.comment = comment;

        await review.save();

        // Recalculate average rating for the product
        const product = await Product.findById(review.productId);
        if (product) {
            const reviews = await Review.find({ productId: product._id });
            const averageRating =
                reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

            product.averageRating = averageRating;
            await product.save();
        }

        res.status(200).json({ message: "Review updated successfully.", review });
    } catch (error) {
        res.status(500).json({ message: "Failed to update review.", error: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        const product = await Product.findById(review.productId);
        if (product) {
            const reviews = await Review.find({ productId: product._id });
            const averageRating =
                reviews.length > 0
                    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
                    : 0;

            product.averageRating = averageRating;
            await product.save();
        }

        res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete review.", error: error.message });
    }
};

module.exports = {
    addReview,
    getReviewsByProduct,
    updateReview,
    deleteReview,
};
