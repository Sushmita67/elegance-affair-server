const Inventory = require("../models/Inventory");
const Product = require("../models/Product");

// Add new inventory
const addInventory = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        product.stock += quantity;
        await product.save();

        const newInventory = new Inventory({ productId, quantity, dateAdded: new Date() });
        await newInventory.save();

        res.status(201).json({ message: "Inventory added successfully.", inventory: newInventory });
    } catch (error) {
        res.status(500).json({ message: "Failed to add inventory.", error: error.message });
    }
};

// View inventory records
const getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().populate("productId", "name stock");
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch inventory.", error: error.message });
    }
};

// View inventory for a specific product
const getInventoryByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const inventoryRecords = await Inventory.find({ productId }).populate("productId", "name stock");
        if (!inventoryRecords.length) {
            return res.status(404).json({ message: "No inventory records found for this product." });
        }

        res.status(200).json(inventoryRecords);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch inventory.", error: error.message });
    }
};

// Delete inventory record
const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;

        const inventoryRecord = await Inventory.findByIdAndDelete(id);
        if (!inventoryRecord) {
            return res.status(404).json({ message: "Inventory record not found." });
        }

        const product = await Product.findById(inventoryRecord.productId);
        if (product) {
            product.stock -= inventoryRecord.quantity;
            await product.save();
        }

        res.status(200).json({ message: "Inventory record deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete inventory.", error: error.message });
    }
};

module.exports = {
    addInventory,
    getAllInventory,
    getInventoryByProduct,
    deleteInventory,
};
