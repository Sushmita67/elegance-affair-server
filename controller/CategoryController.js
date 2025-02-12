const Category = require("../models/Category");

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Error fetching category by ID", error });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name, description, image, priceRange } = req.body;
        const category = new Category({ name, description, image, priceRange });
        await category.save();
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};

// Update category by ID
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error });
    }
};

// Delete category by ID
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
