import { Dependencies } from "../packages/index.js";
import { config } from "../common/index.js";

const userSchema = new Dependencies.mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "manager", "user"],
            default: "user",
        },
        storeId: {
            type: Dependencies.mongoose.Schema.Types.ObjectId,
            ref: "Store",
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

        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await Dependencies.bcrypt.genSalt(10);
    this.password = await Dependencies.bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return Dependencies.bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return Dependencies.jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        config.accessTokenSecret,
        {
            expiresIn: config.accessTokenExpiry,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return Dependencies.jwt.sign(
        {
            _id: this._id,
        },
        config.refreshTokenSecret,
        {
            expiresIn: config.refreshTokenExpiry,
        }
    );
};

export const User = Dependencies.mongoose.model("Users", userSchema);
