const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String, // Store image URL or path
    },
    priceRange: {
        min: { type: Number, required: true }, // Minimum price in this category
        max: { type: Number, required: true }, // Maximum price in this category
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Category", categorySchema);
