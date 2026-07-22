import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const createTweet = asyncHandler(async (req, res) => {
    const { content, pollOptions } = req.body;

    const imageLocalPath = req.file?.path;
    let imageUrl = "";
    if (imageLocalPath) {
        const image = await uploadOnCloudinary(imageLocalPath);
        if (image) {
            imageUrl = image.url;
        }
    }

    let poll = undefined;
    if (pollOptions) {
        const parsedOptions = Array.isArray(pollOptions) ? pollOptions : (typeof pollOptions === 'string' ? JSON.parse(pollOptions) : pollOptions);
        if (parsedOptions.length > 0) {
            poll = {
                options: parsedOptions.map(opt => ({ text: opt, votes: 0 })),
                voters: []
            };
        }
    }

    if (!content && !imageUrl && !poll) {
        throw new ApiError(400, "Content, image, or poll is required");
    }

    const tweet = await Tweet.create({
        content: content || "",
        owner: req.user?._id,
        image: imageUrl,
        poll
    });

    if (!tweet) {
        throw new ApiError(500, "Failed to create tweet");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, tweet, "Tweet created successfully"));
})

const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user id");
    }

    const tweets = await Tweet.find({ owner: userId });

    return res
        .status(200)
        .json(new ApiResponse(200, tweets, "Tweets fetched successfully"));
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }

    if (!content) {
        throw new ApiError(400, "Content is required");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    if (tweet.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You do not have permission to update this tweet");
    }

    tweet.content = content;
    await tweet.save();

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    if (tweet.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You do not have permission to delete this tweet");
    }

    await Tweet.findByIdAndDelete(tweetId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
})

const voteOnPoll = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { optionId } = req.body;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet || !tweet.poll || tweet.poll.options.length === 0) {
        throw new ApiError(404, "Tweet or poll not found");
    }

    if (tweet.poll.voters.includes(req.user?._id)) {
        throw new ApiError(400, "You have already voted on this poll");
    }

    const option = tweet.poll.options.id(optionId);
    if (!option) {
        throw new ApiError(404, "Poll option not found");
    }

    option.votes += 1;
    tweet.poll.voters.push(req.user?._id);
    await tweet.save();

    return res.status(200).json(new ApiResponse(200, tweet, "Voted successfully"));
});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
    voteOnPoll
}
