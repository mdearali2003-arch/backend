"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const mongoose_1 = require("mongoose");
const videoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: [
            "personal development",
            "business & entrepreneurship",
            "financial literacy",
            "podcast",
        ],
        required: true,
    },
}, {
    timestamps: true,
});
exports.Video = (0, mongoose_1.model)("Video", videoSchema);
