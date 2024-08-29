import { Dependencies } from "../packages/index.js";

const strengthOfMedicineSchema = new Dependencies.mongoose.Schema({
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
        default: "active",
    },
    createdBy: {
        type: Dependencies.mongoose.Schema.Types.ObjectId,
        ref: "AdminUser",
    },
    updatedBy: {
        type: Dependencies.mongoose.Schema.Types.ObjectId,
        ref: "AdminUser",
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

export const Strength = Dependencies.mongoose.model("StrengthOfMedicine", strengthOfMedicineSchema);
