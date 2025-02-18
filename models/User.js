const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
            username:{
                type: String,
            },
            email: {
                    type: String,
                    required: true,
                    unique: true,
                    trim: true,
                    lowercase: true,
            },
            password: {
                    type: String,
                    required: false,
                    default: null,
                    minlength: 8,
            },
            photo: {
                    type: String, // URL or file path
                //     default: null,
                    required: false,
            },
            role: {
                    type: String,
                    enum: ["customer", "manager", "admin"], // Role options
                    default: "customer",
            },
            birth_date: {
                    type: Date,
                    default: Date.now,
                    required: false,
            },
            payments: [
                    {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Payment", // Reference to the Payment model
                            default: null, // Optional
                    },
            ],
    },
    {
            timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

//Field OTP
