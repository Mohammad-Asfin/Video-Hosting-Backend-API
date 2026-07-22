import { Report } from "../models/report.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const createReport = asyncHandler(async (req, res) => {
    const { reason, targetType, targetId } = req.body;

    if (!reason || !targetType || !targetId) {
        throw new ApiError(400, "Reason, targetType, and targetId are required");
    }

    if (!['VIDEO', 'COMMENT', 'TWEET', 'USER'].includes(targetType)) {
        throw new ApiError(400, "Invalid targetType");
    }

    if (!mongoose.isValidObjectId(targetId)) {
        throw new ApiError(400, "Invalid targetId");
    }

    const report = await Report.create({
        reporter: req.user?._id,
        reason,
        targetType,
        targetId
    });

    return res.status(201).json(new ApiResponse(201, report, "Report submitted successfully"));
});

const getReports = asyncHandler(async (req, res) => {
    // Ideally this should be protected by an admin middleware
    // We assume the user accessing this route is an admin or has correct permissions
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) {
        query.status = status;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const reports = await Report.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("reporter", "fullName username email");

    const total = await Report.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(200, {
            reports,
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum)
        }, "Reports fetched successfully")
    );
});

const resolveReport = asyncHandler(async (req, res) => {
    const { reportId } = req.params;
    const { status } = req.body; // 'RESOLVED' or 'DISMISSED'

    if (!mongoose.isValidObjectId(reportId)) {
        throw new ApiError(400, "Invalid report id");
    }

    if (!['RESOLVED', 'DISMISSED'].includes(status)) {
        throw new ApiError(400, "Status must be either RESOLVED or DISMISSED");
    }

    const report = await Report.findByIdAndUpdate(
        reportId,
        { $set: { status } },
        { new: true }
    );

    if (!report) {
        throw new ApiError(404, "Report not found");
    }

    return res.status(200).json(new ApiResponse(200, report, "Report updated successfully"));
});

export {
    createReport,
    getReports,
    resolveReport
};
