const Coupon = require("../models/Coupon");

// Get all coupons
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coupons", error });
    }
};

// Get a single coupon by ID
const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findById(id);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.json(coupon);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coupon", error });
    }
};

// Create a new coupon
const createCoupon = async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).json({ message: "Coupon created successfully", coupon });
    } catch (error) {
        res.status(500).json({ message: "Error creating coupon", error });
    }
};

// Update a coupon by ID
const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCoupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.json({ message: "Coupon updated successfully", updatedCoupon });
    } catch (error) {
        res.status(500).json({ message: "Error updating coupon", error });
    }
};

// Delete a coupon by ID
const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        if (!deletedCoupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.json({ message: "Coupon deleted successfully", deletedCoupon });
    } catch (error) {
        res.status(500).json({ message: "Error deleting coupon", error });
    }
};

// Validate a coupon (e.g., during checkout)
const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await Coupon.findOne({ code: code.toUpperCase() });

        if (!coupon) {
            return res.status(404).json({ message: "Invalid coupon code" });
        }

        if (!coupon.isActive || coupon.expirationDate < new Date()) {
            return res.status(400).json({ message: "Coupon is expired or inactive" });
        }

        if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
            return res.status(400).json({ message: "Coupon usage limit reached" });
        }

        res.json({ message: "Coupon is valid", coupon });
    } catch (error) {
        res.status(500).json({ message: "Error validating coupon", error });
    }
};

module.exports = {
    getAllCoupons,
    getCouponById,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    validateCoupon,
};
