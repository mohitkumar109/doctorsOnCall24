import { Dependencies } from "../packages/index.js";
const { ObjectId } = Dependencies.mongoose.Schema.Types;

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
            type: ObjectId,
            ref: "Users",
        },
        updatedBy: {
            type: ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true }
);

export const Usage = Dependencies.mongoose.model("Usage", usageSchema);
