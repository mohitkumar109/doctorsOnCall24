import { Dependencies } from "../packages/index.js";

const storeSchema = new Dependencies.mongoose.Schema({
    storeName: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        phone: { type: String },
        address: { type: String },
        state: { type: String },
        city: { type: String },
        pin: { type: String },
    },
    contactPerson: {
        personName: { type: String },
        email: { type: String },
        mobile: { type: String },
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

export const Store = Dependencies.mongoose.model("Store", storeSchema);
