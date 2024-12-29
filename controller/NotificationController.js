const Notification = require("../models/Notification");

// Get all notifications for a user
const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ recipientId: userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error });
    }
};

// Get a notification by ID
const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notification", error });
    }
};

// Create a notification
const createNotification = async (req, res) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json({ message: "Notification created", notification });
    } catch (error) {
        res.status(500).json({ message: "Error creating notification", error });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({ message: "Notification marked as read", notification });
    } catch (error) {
        res.status(500).json({ message: "Error updating notification", error });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNotification = await Notification.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({ message: "Notification deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notification", error });
    }
};

// Update a notification (if needed for other updates like title, content, etc.)
const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const notification = await Notification.findByIdAndUpdate(id, updatedData, { new: true });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({ message: "Notification updated", notification });
    } catch (error) {
        res.status(500).json({ message: "Error updating notification", error });
    }
};

module.exports = {
    getNotifications,
    createNotification,
    markAsRead,
    deleteNotification,
    getNotificationById,
    updateNotification,
};
