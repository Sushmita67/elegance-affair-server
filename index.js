const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

// Connect to the database
const connectDB = async () => {
    try {
        // Using environment variable for MongoDB URI (security best practice)
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Stop the server if the DB connection fails
    }
};

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);


const port = process.env.PORT || 5000;

// Initialize the connection and start the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.log(`Welcome to Elegance Affair Backend!`);
    });
});
