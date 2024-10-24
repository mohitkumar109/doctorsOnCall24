import { Dependencies } from "../packages/index.js";
const { ObjectId } = Dependencies.mongoose.Schema.Types;

const InventoryLogSchema = new Dependencies.mongoose.Schema({
    storeId: { type: ObjectId, ref: "Store" },
    medicine: { type: ObjectId, ref: "Medicine", required: true },
    quantity_before: { type: Number, required: true },
    quantity_after: { type: Number, required: true },
    action_type: { type: String, enum: ["ADD", "REMOVE", "SALE"], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    createdBy: { type: ObjectId, ref: "Users" },
});

export const MedicineInvtLog = Dependencies.mongoose.model("MedicineInvtLog", InventoryLogSchema);
