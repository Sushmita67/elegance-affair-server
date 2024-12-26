const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
        amount: { type: Number, required: true },
        method: { type: String, enum: ["Credit Card", "Debit Card", "PayPal"], required: true },
        status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
        transactionId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
