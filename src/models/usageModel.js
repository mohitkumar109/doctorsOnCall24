import mongoose, { Schema } from "mongoose";

const usageSchema = new Schema({
    usageName: {
        type: String,
        required: true,
        unique: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "Active",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Usage = mongoose.model("Usage", usageSchema);
