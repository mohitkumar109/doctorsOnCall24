import { Dependencies } from "../../packages/index.js";
import { asyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
import { Helpers } from "../../common/index.js";
import { MODEL } from "../../models/index.js";
import { config } from "../../common/index.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await MODEL.User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

class Controller {
    // description    Register new Admin User
    // route          POST /api/v1/admin/register
    registerAdmin = asyncHandler(async (req, res) => {
        const { fullName, email, password, role, mobile, status, storeId } = req.body;
        if (!fullName || !email || !password || !role || !mobile) {
            throw new ApiError(400, "Required all fields");
        }
        const user = await MODEL.User.findOne({ email });
        if (user) {
            throw new ApiError(400, "User already exist with this email");
        }
        const newUser = await MODEL.User.create({
            fullName,
            email,
            password,
            mobile,
            role,
            storeId,
            status: status || "active",
            createdBy: req?.user?._id,
        });
        const createdUser = await MODEL.User.findById(newUser._id).select("fullName email role");
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }
        return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));
    });

    // description    Auth Admin/Set Token
    // route          POST /api/v1/admin/login
    adminLogin = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(400, "Email and password is required");
        }

        const user = await MODEL.User.findOne({ email });
        if (!user) {
            throw new ApiError(400, "User does not exist");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(400, "Invalid user credentials");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await MODEL.User.findById(user._id).select("-password -refreshToken");

        const cookieOptions = {
            httpOnly: true,
            secure: config.environment === "development",
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        };

        // Respond with success
        res.status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(
                new ApiResponse(
                    200,
                    {
                        data: loggedInUser,
                        accessToken,
                        refreshToken,
                    },
                    "User Logged In Successfully"
                )
            );
    });

    // description    Edit Profile
    // route          Patch /api/v1/admin/edit-profile
    editProfile = asyncHandler(async (req, res) => {
        const userId = req.params.id;
        const { fullName, email, password, mobile, status, storeId } = req.body;

        if (!Dependencies.mongoose.isValidObjectId(userId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const user = await MODEL.User.findById(userId);
        if (!user) {
            throw new ApiError(400, "This user does not exist in the database");
        }

        // Update fields that are provided
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        // Hash the password only if it's provided
        if (password) user.password = password; // This triggers the pre-save middleware to hash the password
        if (mobile) user.mobile = mobile;
        if (status) user.status = status;
        if (storeId) user.storeId = storeId;

        user.updatedBy = req?.user?._id;
        const updatedUser = await user.save();
        return res.status(200).json(new ApiResponse(200, updatedUser, "User Updated Successfully"));
    });

    // description    Admin view profile
    // route          Get /api/v1/admin/view-profile
    viewProfile = asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const user = await MODEL.User.findById(userId).select("name mobile");
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, user, "Fetch Profile details successfully"));
    });

    currentUser = asyncHandler(async (req, res) => {
        return res.status(200).json(new ApiResponse(200, req.user, "User fetched Successfully"));
    });

    userList = asyncHandler(async (req, res) => {
        if (req.user.role === "admin") {
            // Admin can view all users
            const users = await MODEL.User.find({ role: { $ne: "admin" } })
                .select("-refreshToken -password -updatedAt -__v")
                .populate("createdBy", "fullName")
                .populate("updatedBy", "fullName")
                .populate("storeId", "storeName");

            if (!users) {
                throw new ApiError(400, "User not found");
            }
            return res.status(200).json(new ApiResponse(200, users, "All Users List"));
        } else if (req.user.role === "user") {
            // Regular user can view only their own profile
            const user = await MODEL.User.findById(req.user._id);
            if (!user) {
                throw new ApiError(400, "User not found");
            }
            return res.status(200).json(new ApiResponse(200, user, "Get User"));
        } else {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }
    });

    userOne = asyncHandler(async (req, res) => {
        const userId = req.params.id;
        const user = await MODEL.User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return res.status(200).json(new ApiResponse(200, user, "Fetch user details successfully"));
    });

    actionOnUser = asyncHandler(async (req, res) => {
        const { ids } = req.body;
        const action = ids
            ? Helpers.actionOnMultipleIds(ids.split(","), req.params.status, MODEL.User)
            : Helpers.actionOnSingleId(req.params.id, req.params.status, MODEL.User);
        await action;
        const successMessage = ids
            ? `Selected record(s) ${req.params.status} successfully`
            : `Selected ${req.params.status} successfully`;
        return res.status(200).json(new ApiResponse(200, {}, successMessage));
    });

    // description    Admin logout
    // route          POST /api/v1/admin/logout
    adminLogout = asyncHandler(async (req, res) => {
        await MODEL.User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1, // This remove the field from document
                },
            },
            {
                new: true,
            }
        );
        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
    });

    // description    Admin Reset password
    // route          POST /api/v1/admin/resetPassword
    resetPassword = asyncHandler(async (req, res) => {
        console.log("hello4");
    });

    // description    Admin Change password
    // route          POST /api/v1/admin/changePassword
    changePassword = asyncHandler(async (req, res) => {
        console.log("hello4");
    });
}

export const AdminController = new Controller();
