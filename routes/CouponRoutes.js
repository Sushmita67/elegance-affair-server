const express = require("express");
const {
    getAllCoupons,
    getCouponById,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    validateCoupon,
} = require("../controller/CouponController");
const router = express.Router();

// Coupon Routes
router.get("/", getAllCoupons); // Get all coupons
router.get("/:id", getCouponById); // Get coupon by ID
router.post("/", createCoupon); // Create new coupon
router.put("/:id", updateCoupon); // Update coupon
router.delete("/:id", deleteCoupon); // Delete coupon
router.post("/validate", validateCoupon); // Validate coupon during checkout

module.exports = router;
