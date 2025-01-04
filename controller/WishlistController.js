const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Add product to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId, items: [] });
        }

        if (!wishlist.items.includes(productId)) {
            wishlist.items.push(productId);
        }

        await wishlist.save();
        res.status(200).json({ message: "Product added to wishlist successfully.", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product to wishlist.", error: error.message });
    }
};

// View wishlist
const viewWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        const wishlist = await Wishlist.findOne({ userId }).populate("items", "name price");
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found." });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch wishlist.", error: error.message });
    }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found." });
        }

        wishlist.items = wishlist.items.filter((item) => item.toString() !== productId);
        await wishlist.save();

        res.status(200).json({ message: "Product removed from wishlist successfully.", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove product from wishlist.", error: error.message });
    }
};

module.exports = {
    addToWishlist,
    viewWishlist,
    removeFromWishlist,
};
