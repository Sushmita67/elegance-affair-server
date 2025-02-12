const Collection = require("../models/Collection");

// Get all collections
const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.json(collections);
    } catch (error) {
        res.status(500).json({ message: "Error fetching collections", error });
    }
};

// Get collection by ID
const getCollectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await Collection.findById(id);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        res.json(collection);
    } catch (error) {
        res.status(500).json({ message: "Error fetching collection by ID", error });
    }
};

// Create a new collection
const createCollection = async (req, res) => {
    try {
        const collection = new Collection(req.body);
        await collection.save();
        res.status(201).json({ message: "Collection created successfully", collection });
    } catch (error) {
        res.status(500).json({ message: "Error creating collection", error });
    }
};

// Update collection by ID
const updateCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCollection = await Collection.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCollection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        res.json({ message: "Collection updated successfully", updatedCollection });
    } catch (error) {
        res.status(500).json({ message: "Error updating collection", error });
    }
};

// Delete collection by ID
const deleteCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCollection = await Collection.findByIdAndDelete(id);
        if (!deletedCollection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        res.json({ message: "Collection deleted successfully", deletedCollection });
    } catch (error) {
        res.status(500).json({ message: "Error deleting collection", error });
    }
};

module.exports = {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection,
};
