const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Import multer configuration from config/multerConfig.js
const upload = require('./config/multerConfig');

const connectDB = require("./config/db");

// Import routes
// const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/AuthRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const returnRoutes = require("./routes/returnRoutes");
const couponRoutes = require("./routes/CouponRoutes");
const notificationRoutes = require("./routes/NotificationRouter");
const categoryRoutes = require("./routes/CategoryRoutes");
const collectionRoutes = require("./routes/CollectionRoutes");

// // Connect to the database
// const connectDB = async () => {
//     try {
//         // Using environment variable for MongoDB URI (security best practice)
//         await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("MongoDB connected");
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//         process.exit(1); // Stop the server if the DB connection fails
//     }
// };



// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads')); // Endpoint for Image Location

// Use routes
// app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/collections", collectionRoutes);

const port = process.env.PORT || 5000;

// Initialize the connection and start the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.log(`Welcome to Elegance Affair Backend!`);
    });
});
