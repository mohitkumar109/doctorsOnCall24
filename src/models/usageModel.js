import { Dependencies } from "../packages/index.js";

const usageSchema = new Dependencies.mongoose.Schema({
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
        default: "active",
    },
    createdBy: {
        type: Dependencies.mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    updatedBy: {
        type: Dependencies.mongoose.Schema.Types.ObjectId,
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

export const Usage = Dependencies.mongoose.model("Usage", usageSchema);
