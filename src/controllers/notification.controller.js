import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUserNotifications = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const notifications = await Notification.find({ recipient: req.user?._id })
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("sender", "fullName username avatar")
        .populate("video", "title thumbnail")
        .populate("tweet", "content")
        .populate("comment", "content");

    const total = await Notification.countDocuments({ recipient: req.user?._id });

    return res.status(200).json(
        new ApiResponse(200, {
            notifications,
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum)
        }, "Notifications fetched successfully")
    );
});

const markAsRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: req.user?._id },
        { $set: { isRead: true } },
        { new: true }
    );

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(
        new ApiResponse(200, notification, "Notification marked as read")
    );
});

export {
    getUserNotifications,
    markAsRead
};
