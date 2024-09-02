import { Dependencies } from "../packages/index.js";

const categorySchema = new Dependencies.mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: [true, "Category name is required"],
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

export const Category = Dependencies.mongoose.model("Category", categorySchema);
