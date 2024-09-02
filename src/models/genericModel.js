import { Dependencies } from "../packages/index.js";

const genericNameSchema = new Dependencies.mongoose.Schema(
    {
        genericName: {
            type: String,
            required: [true, "Generic name is required"],
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

export const Generic = Dependencies.mongoose.model("GenericName", genericNameSchema);
