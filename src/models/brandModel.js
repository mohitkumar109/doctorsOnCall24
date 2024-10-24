import { Dependencies } from "../packages/index.js";
const { ObjectId } = Dependencies.mongoose.Schema.Types;

const brandSchema = new Dependencies.mongoose.Schema({
    brandName: {
        type: String,
        required: [true, "Brand name is required"],
        unique: true,
        lowercase: true,
        trim: true,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

brandSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

export const Brand = Dependencies.mongoose.model("Brand", brandSchema);
