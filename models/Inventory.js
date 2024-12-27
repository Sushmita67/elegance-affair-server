const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 0 },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Admin responsible for stock updates
}, { timestamps: true });

module.exports = mongoose.model("Inventory", InventorySchema);
