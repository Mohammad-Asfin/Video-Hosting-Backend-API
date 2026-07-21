import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const like = await Like.findOne({ video: videoId, likedBy: req.user?._id });

    if (like) {
        await Like.findByIdAndDelete(like._id);
        return res.status(200).json(new ApiResponse(200, { liked: false }, "Like removed from video"));
    } else {
        await Like.create({ video: videoId, likedBy: req.user?._id });
        return res.status(200).json(new ApiResponse(200, { liked: true }, "Like added to video"));
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    const like = await Like.findOne({ comment: commentId, likedBy: req.user?._id });

    if (like) {
        await Like.findByIdAndDelete(like._id);
        return res.status(200).json(new ApiResponse(200, { liked: false }, "Like removed from comment"));
    } else {
        await Like.create({ comment: commentId, likedBy: req.user?._id });
        return res.status(200).json(new ApiResponse(200, { liked: true }, "Like added to comment"));
    }
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params;
    
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }

    const like = await Like.findOne({ tweet: tweetId, likedBy: req.user?._id });

    if (like) {
        await Like.findByIdAndDelete(like._id);
        return res.status(200).json(new ApiResponse(200, { liked: false }, "Like removed from tweet"));
    } else {
        await Like.create({ tweet: tweetId, likedBy: req.user?._id });
        return res.status(200).json(new ApiResponse(200, { liked: true }, "Like added to tweet"));
    }
})

const getLikedVideos = asyncHandler(async (req, res) => {
    const likedVideos = await Like.find({
        likedBy: req.user?._id,
        video: { $ne: null }
    }).populate("video");

    return res.status(200).json(new ApiResponse(200, likedVideos, "Liked videos fetched successfully"));
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}