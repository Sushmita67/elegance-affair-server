const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add product to cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product || product.stock < quantity) {
            return res.status(400).json({ message: "Product not available or insufficient stock." });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart successfully.", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product to cart.", error: error.message });
    }
};

// View cart
const viewCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate("items.productId", "name price");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch cart.", error: error.message });
    }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: "Product removed from cart successfully.", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove product from cart.", error: error.message });
    }
};

// Get cart by user ID
const getCartByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate("items.productId", "name price");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        res.status(200).json({ message: "Cart fetched successfully.", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch cart.", error: error.message });
    }
};

// Update cart item
const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (quantity < 0) {
            return res.status(400).json({ message: "Quantity cannot be negative." });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart." });
        }

        if (quantity === 0) {
            // Remove item if quantity is 0
            cart.items.splice(itemIndex, 1);
        } else {
            // Update quantity
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();

        res.status(200).json({ message: "Cart item updated successfully.", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to update cart item.", error: error.message });
    }
};

module.exports = {
    addToCart,
    viewCart,
    removeFromCart,
    getCartByUser,
    updateCartItem,
};
