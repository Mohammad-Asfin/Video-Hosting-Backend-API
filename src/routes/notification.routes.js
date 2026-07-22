import { Router } from 'express';
import {
    getUserNotifications,
    markAsRead
} from "../controllers/notification.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").get(getUserNotifications);
router.route("/:notificationId/read").patch(markAsRead);

export default router;
