import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
    voteOnPoll
} from "../controllers/tweet.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import {moderateContent} from "../middlewares/moderation.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(upload.single("image"), moderateContent, createTweet);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(moderateContent, updateTweet).delete(deleteTweet);
router.route("/:tweetId/vote").patch(voteOnPoll);

export default router