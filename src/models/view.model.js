import mongoose, {Schema} from "mongoose";

const viewSchema = new Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User" // Optional, for guests
        },
        ipAddress: {
            type: String // To help prevent view botting from same IP
        }
    },
    {
        timestamps: true
    }
);

export const View = mongoose.model("View", viewSchema);
