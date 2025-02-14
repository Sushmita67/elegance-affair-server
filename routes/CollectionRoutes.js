const express = require("express");
const router = express.Router();

const {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection,
} = require("../controller/CollectionController");

router.get("/", getAllCollections);
router.get("/:id", getCollectionById);
router.post("/", createCollection);
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);

module.exports = router;