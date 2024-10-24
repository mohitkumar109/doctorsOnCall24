import { Dependencies } from "../packages/index.js";
const { ObjectId } = Dependencies.mongoose.Schema.Types;

const medicineOrderSchema = new Dependencies.mongoose.Schema({
    orderId: { type: String, required: true },
    items: [
        {
            medicine: { type: ObjectId, ref: "Medicine", required: true },
            quantity: { type: Number, required: true },
        },
    ],
    orderPrice: { type: Number, required: true },
    orderDt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: { values: ["pending"], message: "Status can't be out of {VALUE}" },
        default: "pending",
    },
    storeId: { type: ObjectId, ref: "Store" },
    createdBy: { type: ObjectId, ref: "Users" },
});

export const MedicineOrder = Dependencies.mongoose.model("medicineOrder", medicineOrderSchema);
