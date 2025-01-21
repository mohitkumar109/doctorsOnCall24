import { Dependencies } from "../packages/index.js";
const { ObjectId } = Dependencies.mongoose.Schema.Types;

const storeMedicineSchema = new Dependencies.mongoose.Schema(
    {
        medicineId: { type: ObjectId, ref: "Medicine", required: true },
        storeId: { type: ObjectId, ref: "Store", required: true },
        quantity: { type: Number, required: true },
        createdBy: { type: ObjectId, ref: "Users" },
    },
    { timestamps: true }
);

export const StoreMedicine = Dependencies.mongoose.model("StoreMedicine", storeMedicineSchema);
