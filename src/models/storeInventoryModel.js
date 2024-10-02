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
                medicineId: {
                    type: Dependencies.mongoose.Schema.Types.ObjectId,
                    ref: "Medicine",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],

        orderPrice: {
            type: Number,
            required: true,
        },

        orderDate: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: ["pending", "complete"],
            default: "pending",
        },

        isPaymentDone: {
            type: Boolean,
            default: false,
        },

        createdBy: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true }
);

export const StoreInventory = Dependencies.mongoose.model("StoreInventory", storeInventorySchema);
