import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {Notification} from "../models/notification.model.js"
import {Video} from "../models/video.model.js"
import {Comment} from "../models/comment.model.js"
import {Tweet} from "../models/tweet.model.js"
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
        
        const video = await Video.findById(videoId).select("owner");
        if (video && video.owner.toString() !== req.user?._id.toString()) {
            await Notification.create({
                recipient: video.owner,
                sender: req.user?._id,
                type: 'LIKE',
                video: videoId
            });
        }
        
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

        const comment = await Comment.findById(commentId).select("owner");
        if (comment && comment.owner.toString() !== req.user?._id.toString()) {
            await Notification.create({
                recipient: comment.owner,
                sender: req.user?._id,
                type: 'LIKE',
                comment: commentId
            });
        }

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

        const tweet = await Tweet.findById(tweetId).select("owner");
        if (tweet && tweet.owner.toString() !== req.user?._id.toString()) {
            await Notification.create({
                recipient: tweet.owner,
                sender: req.user?._id,
                type: 'LIKE',
                tweet: tweetId
            });
        }

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