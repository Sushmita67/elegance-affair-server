const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
    {
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
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;