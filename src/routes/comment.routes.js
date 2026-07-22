import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
    getCommentReplies
} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {commentLimiter} from "../middlewares/rateLimiter.js"
import {moderateContent} from "../middlewares/moderation.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:videoId").get(getVideoComments).post(commentLimiter, moderateContent, addComment);
router.route("/c/:commentId").delete(deleteComment).patch(moderateContent, updateComment);
router.route("/c/:commentId/replies").get(getCommentReplies);

export default router