import { Dependencies } from "../packages/index.js";

const usageSchema = new Dependencies.mongoose.Schema(
    {
        usageName: {
            type: String,
            required: [true, "Usage name is required"],
            unique: true,
            lowercase: true,
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
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        updatedBy: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true }
);

export const Usage = Dependencies.mongoose.model("Usage", usageSchema);
