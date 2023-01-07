import mongoose from "mongoose";

const Schema = mongoose.Schema;

const journeySchema = new Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    },
    // likes: {
    //     type: [String],
    //     default: []
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const Journey = mongoose.model('Journey', journeySchema);

export default Journey;