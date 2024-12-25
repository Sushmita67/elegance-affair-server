const Product = require("../models/Product");

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;

        const newProduct = new Product({ name, description, price, category, stock, images });
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully.", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to create product.", error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products.", error: error.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product.", error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock, images } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category, stock, images },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product updated successfully.", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product.", error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product.", error: error.message });
    }
};

// Search products by name or category
const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;

        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
            ],
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Search failed.", error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
};
