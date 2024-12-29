const express = require("express");
const router = express.Router();
const notificationController = require("../controller/NotificationController");

// Notification Routes
router.get("/:userId", notificationController.getNotifications); // Get all notifications for a user
router.get("/notification/:id", notificationController.getNotificationById); // Get notification by ID
router.post("/", notificationController.createNotification); // Create notification
router.put("/mark-read/:id", notificationController.markAsRead); // Mark notification as read
router.put("/:id", notificationController.updateNotification); // Update notification
router.delete("/:id", notificationController.deleteNotification); // Delete notification

module.exports = router;
