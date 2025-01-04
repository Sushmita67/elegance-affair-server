const User = require("../models/User");
const transporter = require("../config/mailConfig");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user by ID", error });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Welcome to Our Jewelry Store",
            text: `Hello ${user.username},\n\nWelcome to our jewelry store! Your user ID is ${user._id}.\n\nThank you for registering.\n\nBest regards,\nThe Jewelry Store Team`,
            html: `
                <p>Hello <strong>${user.username}</strong>,</p>
                <p>Welcome to our jewelry store! Your user ID is <strong>${user._id}</strong>.</p>
                <p>Thank you for registering.</p>
                <p>Best regards,<br>The Jewelry Store Team</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: "User created successfully and email sent",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user or sending email",
            error,
        });
    }
};

// Update user by ID (PUT)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Partially update user by ID (PATCH)
const patchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const patchedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!patchedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated partially successfully", patchedUser });
    } catch (error) {
        res.status(500).json({ message: "Error partially updating user", error });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
};
