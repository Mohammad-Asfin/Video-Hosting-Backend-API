import mongoose, {Schema} from "mongoose";

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String // cloudinary url
    },
    poll: {
        options: [{
            text: String,
            votes: { type: Number, default: 0 }
        }],
        voters: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    }
}, {timestamps: true})


export const Tweet = mongoose.model("Tweet", tweetSchema)