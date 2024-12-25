const express = require("express");
const router = express.Router();
const productController = require("../controller/ProductController");

// Product Routes
router.get("/", productController.getAllProducts); // Get all products
router.get("/:id", productController.getProductById); // Get product by ID
router.post("/save", productController.createProduct); // Create new product
router.put("/:id", productController.updateProduct); // Update product
router.delete("/:id", productController.deleteProduct); // Delete product

module.exports = router;
