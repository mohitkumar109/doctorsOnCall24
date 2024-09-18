import { Dependencies } from "../packages/index.js";

const storeCartSchema = new Dependencies.mongoose.Schema({
    storeId: { type: Dependencies.mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
    items: [
        {
            _id: false,
            medicineId: {
                type: Dependencies.mongoose.Schema.Types.ObjectId,
                ref: "Medicine",
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    createdBy: {
        type: Dependencies.mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const StoreCart = Dependencies.mongoose.model("StoreCart", storeCartSchema);
