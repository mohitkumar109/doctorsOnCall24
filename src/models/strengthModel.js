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

export default Strength = mongoose.model("StrengthOfMedicine", strengthOfMedicineSchema);
