import { Dependencies } from "../packages/index.js";
import { config } from "../common/index.js";

const adminSchema = new Dependencies.mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        default: "admin",
    },
    status: {
        type: String,
        default: "Active",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    refreshToken: {
        type: String,
    },
});

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await Dependencies.bcrypt.genSalt(10);
    this.password = await Dependencies.bcrypt.hash(this.password, salt);
    next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
    return Dependencies.bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
    return Dependencies.jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        config.accessTokenSecret,
        {
            expiresIn: config.accessTokenExpiry,
        }
    );
};

adminSchema.methods.generateRefreshToken = function () {
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

export const AdminUser = Dependencies.mongoose.model("AdminUser", adminSchema);
