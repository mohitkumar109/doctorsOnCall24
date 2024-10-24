import { Dependencies } from "../packages/index.js";
const { ObjectId } = Dependencies.mongoose.Schema.Types;

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

export const Category = Dependencies.mongoose.model("Category", categorySchema);
