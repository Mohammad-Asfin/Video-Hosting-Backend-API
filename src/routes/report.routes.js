import { Router } from 'express';
import {
    createReport,
    getReports,
    resolveReport
} from "../controllers/report.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createReport)
    .get(getReports); // In a real app, protect this with admin middleware

router.route("/:reportId").patch(resolveReport);

export default router;
