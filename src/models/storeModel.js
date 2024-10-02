import { Dependencies } from "../packages/index.js";

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

        medicine: [
            {
                type: Dependencies.mongoose.Schema.Types.ObjectId,
                ref: "Medicine",
                required: true,
            },
        ],

        createdBy: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        updatedBy: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true }
);

export const Store = Dependencies.mongoose.model("Store", storeSchema);
