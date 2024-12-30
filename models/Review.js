const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Review", ReviewSchema);
