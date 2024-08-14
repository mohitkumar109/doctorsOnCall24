import mongoose, { Schema } from "mongoose";

const strengthOfMedicineSchema = new Schema({
    strengthName: {
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
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
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

export const Strength = mongoose.model("StrengthOfMedicine", strengthOfMedicineSchema);
