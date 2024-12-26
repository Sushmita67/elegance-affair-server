const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { userId, items, shippingAddress, paymentMethod, totalAmount } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const orderItems = await Promise.all(
            items.map(async (item) => {
                const product = await Product.findById(item.productId);
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found.`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Not enough stock for product ${product.name}.`);
                }
                product.stock -= item.quantity;
                await product.save();
                return { productId: product._id, quantity: item.quantity, price: product.price };
            })
        );

        const newOrder = new Order({
            user: userId,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalAmount,
            status: "Pending",
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully.", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Failed to create order.", error: error.message });
    }
};

// Get orders by user ID
const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ user: userId }).populate("items.productId", "name price");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders.", error: error.message });
    }
};

// Get all orders (admin view)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "username email").populate("items.productId", "name");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders.", error: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ message: "Order status updated successfully.", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Failed to update order status.", error: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete order.", error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
};
