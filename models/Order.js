const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    payment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    return_id: { type: mongoose.Schema.Types.ObjectId, ref: "Return" },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
