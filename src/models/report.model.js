import mongoose, {Schema} from "mongoose";

const reportSchema = new Schema(
    {
        reporter: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'RESOLVED', 'DISMISSED'],
            default: 'PENDING'
        },
        targetType: {
            type: String,
            enum: ['VIDEO', 'COMMENT', 'TWEET', 'USER'],
            required: true
        },
        targetId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Report = mongoose.model("Report", reportSchema);
