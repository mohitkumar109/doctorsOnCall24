import { Dependencies } from "../packages/index.js";

const storeCartSchema = new Dependencies.mongoose.Schema({
    storeId: { type: Dependencies.mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
    items: {
        type: [
            {
                medicineId: { type: Dependencies.mongoose.Schema.Types.ObjectId, ref: "Medicine" },
                quantity: { type: Number, required: true },
            },
        ],
        default: [],
    },
    createdBy: { type: Dependencies.mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const StoreCart = Dependencies.mongoose.model("StoreCart", storeCartSchema);
