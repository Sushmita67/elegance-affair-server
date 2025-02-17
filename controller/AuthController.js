const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const transporter = require("../config/mailConfig"); // Mail transporter for sending emails
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const RESET_TOKEN_EXPIRY = 3600; // 1 hour expiration for reset tokens

// Register a new user
const register = async (req, res) => {
    // try {
    //     const { email, role = "customer" } = req.body;

    //     // Check if the email is already in use
    //     const existingUser = await User.findOne({ email });
    //     if (existingUser) {
    //         return res.status(400).json({ message: "Email is already registered." });
    //     }

    //     // Create a new user with pending status and no password
    //     const newUser = new User({ email, role, status: "pending",photo });
    //     await newUser.save();

    //     // Generate a reset token for setting the password
    //     const resetToken = jwt.sign({ user_id: newUser._id }, SECRET_KEY, { expiresIn: RESET_TOKEN_EXPIRY });

    //     // Construct the reset link
    //     const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    //     // Send a welcome email with the password reset link
    //     const mailOptions = {
    //         from: process.env.EMAIL_USER,
    //         to: newUser.email,
    //         subject: "Welcome to Emirates Elegance! Complete Your Registration",
    //         html: `
    //             <p>Hi ${email},</p>
    //             <p>Thank you for registering with Emirates Elegance.</p>
    //             <p>Click <a href="${resetLink}">here</a> to set your password and complete your registration.</p>
    //             <p>If you did not sign up, please ignore this email.</p>
    //         `,
    //     };

    //     await transporter.sendMail(mailOptions);

    //     res.status(201).json({ message: "Registration successful. Check your email to set your password." });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: "Registration failed.", error });
    // }
    try {
        const { email, username, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const user = new User({
            email,
            username,
            password: hashedPassword,
            role: "customer", 
        });
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

// Mobile Registration
const registerMobile = async (req, res) => {
    try {
        const { name, email, username, phone, password,photo } = req.body;

        // Check for required fields
        if (!email || !password ) {
            return res.status(400).send({ message: "Email, password" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "Email is already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            photo,
            username,
            phone,
            password: hashedPassword,
            role: "customer", 
            status: "active",
        });

        // Save the user
        await user.save();

        // Generate a token for immediate session
        const token = jwt.sign(
            { user_id: user._id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        // // Send registration email
        // const mailOptions = {
        //     from: process.env.EMAIL_USER,
        //     to: user.email,
        //     subject: "Registration Successful. Welcome!",
        //     html: WelcomeEmail({ name: user.name }),
        // };
        // await transporter.sendMail(mailOptions);

        res
            .status(201)
            .cookie("token", token) // key , value ,options
            .json({
                success: true,
                token,
            });

    
    } catch (error) {
        console.error("Mobile Registration Error:", error);
        res.status(500).send({ message: "Registration failed", error });
    }
};


//upload Images
 const uploadImage = async (req, res, next) => {


    if (!req.file) {
        return res.status(400).send({ message: "Please upload a file" });
    }
    res.status(200).json({
        success: true,
        data: req.file.filename,
    });
}

// Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate a token
        const token = jwt.sign(
            { user_id: user._id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: "6h" }
        );

        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, email: user.email, role: user.role },
            message: "Login successful.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed.", error });
    }
};

// Request password reset
const resetPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const resetToken = jwt.sign({ user_id: user._id }, SECRET_KEY, { expiresIn: RESET_TOKEN_EXPIRY });

        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `
                <p>We received a request to reset your password.</p>
                <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send reset email.", error });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to reset password.", error });
    }
};

// Validate Session
const validateSession = async (req, res) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).send({ message: "No token provided" });
        }

        const verified = jwt.verify(token, SECRET_KEY);

        if (!verified) {
            return res.status(401).send({ message: "Invalid or expired token" });
        }

        res.status(200).send({ message: "Token is valid", user: verified });
    } catch (error) {
        res.status(401).send({ message: "Invalid or expired token", error });
    }
};

module.exports = {
    register,
    registerMobile,
    uploadImage,
    login,
    resetPasswordRequest,
    resetPassword,
    validateSession,
};
