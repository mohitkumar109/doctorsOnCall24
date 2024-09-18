import { Dependencies } from "../packages/index.js";

const storeInventorySchema = new Dependencies.mongoose.Schema(
    {
        storeId: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },

        items: [
            {
                _id: false,
                medicineId: {
                    type: Dependencies.mongoose.Schema.Types.ObjectId,
                    ref: "Medicine",
                    required: true,
                },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                totalPrice: { type: Number, required: true },
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        orderDate: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            default: "active",
        },

        createdBy: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true }
);

export const StoreInventory = Dependencies.mongoose.model("StoreInventory", storeInventorySchema);
