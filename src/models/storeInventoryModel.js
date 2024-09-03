import { Dependencies } from "../packages/index.js";

const storeInventorySchema = new Dependencies.mongoose.Schema(
    {
        storeId: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        medicineId: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "MedicineProduct",
            required: true,
        },
        quantity: {
            type: Number,
            required: [true, "Qty is required"],
            min: [1, "Qty must be at least 1"],
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

export const StoreInventory = Dependencies.mongoose.model("StoreInventory", storeInventorySchema);
