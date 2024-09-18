import { Dependencies } from "../packages/index.js";

const medicineProductSchema = new Dependencies.mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Medicine name is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        categoryId: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category id required"],
        },
        genericId: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Generic",
            required: [true, "Generic id required"],
        },
        brandId: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: [true, "Brand id required"],
        },
        strengthId: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Strength",
            required: [true, "Strength id required"],
        },
        usageId: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Usage",
            required: [true, "Usage id required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be a positive number"],
        },
        stock: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "Quantity must be at least 1"],
        },
        expireDate: {
            type: Date,
            required: [true, "Expire date is required"],
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

export const Medicine = Dependencies.mongoose.model("Medicine", medicineProductSchema);

export const getMedicineName = (id) => Medicine.findById(id);
