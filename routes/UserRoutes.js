const { getAllUsers, getUserById, createUser, updateUser, patchUser, deleteUser } = require("../controller/UserController");
const express = require("express");
const userValidation = require("../validation/userValidation");
const router = express.Router();

// Get all users
// router.get("/", authorization, authorizeRole("ADMIN"), getUsers);
router.get("/", getAllUsers);

// Create a new user
router.post("/save", createUser);

// Get user by ID
router.get("/getById/:id", getUserById);

// Update user by ID
router.put("/update/:id", updateUser);

// Partially update user by ID
router.patch("/patch/:id", patchUser);

// Delete user by ID
router.delete("/delete/:id", deleteUser);

module.exports = router;

