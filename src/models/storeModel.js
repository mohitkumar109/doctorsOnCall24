import { Dependencies } from "../packages/index.js";
const { ObjectId } = Dependencies.mongoose.Schema.Types;

const storeSchema = new Dependencies.mongoose.Schema(
    {
        storeName: {
            type: String,
            required: [true, "Store name is required"],
            unique: true,
            lowercase: true,
            trim: true,
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
            type: ObjectId,
            ref: "Users",
        },
        updatedBy: {
            type: ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true }
);

export const Store = Dependencies.mongoose.model("Store", storeSchema);
