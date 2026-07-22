import Filter from "bad-words";
import { ApiError } from "../utils/ApiError.js";

const filter = new Filter();

export const moderateContent = (req, res, next) => {
    const { content, description, title } = req.body;

    if (content && filter.isProfane(content)) {
        return next(new ApiError(400, "Content contains prohibited words."));
    }
    
    if (description && filter.isProfane(description)) {
        return next(new ApiError(400, "Description contains prohibited words."));
    }
    
    if (title && filter.isProfane(title)) {
        return next(new ApiError(400, "Title contains prohibited words."));
    }

    next();
};
