import { Dependencies } from "../packages/index.js";
const { ObjectId } = Dependencies.mongoose.Schema.Types;

const strengthOfMedicineSchema = new Dependencies.mongoose.Schema({
    strengthName: {
        type: Number,
        required: [true, "Strength is required"],
        unique: true,
        trim: true,
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
        type: ObjectId,
        ref: "Users",
    },
    updatedBy: {
        type: ObjectId,
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

strengthOfMedicineSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

export const Strength = Dependencies.mongoose.model("Strength", strengthOfMedicineSchema);
