import { Dependencies } from "../packages/index.js";

const formOfMedicineSchema = new Dependencies.mongoose.Schema({
    formName: {
        type: String,
        required: true,
        unique: true,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const FormOfMedicine = Dependencies.mongoose.model("FormOfMedicine", formOfMedicineSchema);
