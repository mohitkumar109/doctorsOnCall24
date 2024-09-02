import { Dependencies } from "../packages/index.js";

const medicineProductSchema = new Dependencies.mongoose.Schema(
    {
        genericName: {
            type: String,
            required: [true, "Generic name is required"],
            lowercase: true,
            trim: true,
        },
        categoryName: {
            type: String,
            required: [true, "Category name is required"],
            lowercase: true,
            trim: true,
        },
        brandName: {
            type: String,
            required: [true, "Brand name is required"],
            lowercase: true,
            trim: true,
        },
        strengthName: {
            type: String,
            required: [true, "Strength name is required"],
            lowercase: true,
            trim: true,
        },
        usageName: {
            type: String,
            required: [true, "Usage name is required"],
            lowercase: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "Quantity must be at least 1"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be a positive number"],
        },
        expireDate: {
            type: Date,
            required: [true, "Expire date is required"],
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

export const MedicineProduct = Dependencies.mongoose.model(
    "MedicineProduct",
    medicineProductSchema
);
