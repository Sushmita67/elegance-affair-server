const mongoose = require("mongoose");

const ReturnSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["Requested", "Approved", "Rejected"], default: "Requested" },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Admin responsible for handling return
}, { timestamps: true });

module.exports = mongoose.model("Return", ReturnSchema);
