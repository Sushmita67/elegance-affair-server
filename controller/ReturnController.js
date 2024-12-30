const Return = require("../models/Return");
const Order = require("../models/Order");

// Request a return (Create Return)
const requestReturn = async (req, res) => {
    try {
        const { orderId, reason } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        const newReturn = new Return({
            orderId,
            reason,
            status: "Pending",
            dateRequested: new Date(),
        });

        await newReturn.save();
        res.status(201).json({ message: "Return requested successfully.", return: newReturn });
    } catch (error) {
        res.status(500).json({ message: "Failed to request return.", error: error.message });
    }
};

// View all return requests
const viewReturns = async (req, res) => {
    try {
        const returns = await Return.find().populate("orderId", "productId quantity");
        res.status(200).json(returns);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch return requests.", error: error.message });
    }
};

// Get returns for a specific order
const getReturnsByOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const returns = await Return.find({ orderId }).populate("orderId", "productId quantity");
        if (!returns.length) {
            return res.status(404).json({ message: "No return requests found for this order." });
        }

        res.status(200).json(returns);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch returns.", error: error.message });
    }
};

// Update return status
const updateReturn = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const returnRequest = await Return.findById(id);
        if (!returnRequest) {
            return res.status(404).json({ message: "Return request not found." });
        }

        returnRequest.status = status || returnRequest.status;
        await returnRequest.save();

        res.status(200).json({ message: "Return status updated successfully.", return: returnRequest });
    } catch (error) {
        res.status(500).json({ message: "Failed to update return status.", error: error.message });
    }
};

// Delete return request
const deleteReturn = async (req, res) => {
    try {
        const { id } = req.params;

        const returnRequest = await Return.findByIdAndDelete(id);
        if (!returnRequest) {
            return res.status(404).json({ message: "Return request not found." });
        }

        res.status(200).json({ message: "Return request deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete return request.", error: error.message });
    }
};

module.exports = {
    requestReturn,
    viewReturns,
    getReturnsByOrder,
    updateReturn,
    deleteReturn,
};
