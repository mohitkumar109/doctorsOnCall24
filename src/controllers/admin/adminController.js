import { asyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
import { MODEL } from "../../models/index.js";

const generateAccessAndRefreshTokens = async (adminId) => {
    try {
        const admin = await MODEL.AdminUser.findById(adminId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();
        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

class Controller {
    // description    Register new Admin User
    // route          POST /api/v1/admin/register
    registerAdmin = asyncHandler(async (req, res) => {
        const { name, email, password, mobile } = req.body;
        if (!name || !email || !password || !mobile) {
            throw new ApiError(400, "Required all fields");
        }
        const admin = await MODEL.AdminUser.findOne({ email });
        if (admin) {
            throw new ApiError(400, "Admin already exist with this email");
        }
        const newAdmin = await MODEL.AdminUser.create({
            name,
            email,
            password,
            mobile,
        });
        const createdAdmin = await MODEL.AdminUser.findById(newAdmin._id).select("name email");
        if (!createdAdmin) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }
        return res
            .status(201)
            .json(new ApiResponse(201, createdAdmin, "Admin created successfully"));
    });

    // description    Auth Admin/Set Token
    // route          POST /api/v1/admin/login
    adminLogin = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(400, "Email and password is required");
        }

        const admin = await MODEL.AdminUser.findOne({ email });
        if (!admin) {
            throw new ApiError(400, "Admin user does not exist");
        }

        const isPasswordValid = await admin.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(400, "Invalid admin credentials");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id);
        const loggedInAdmin = await MODEL.AdminUser.findById(admin._id).select(
            "-password -refreshToken"
        );

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
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
                        data: loggedInAdmin,
                        accessToken,
                        refreshToken,
                    },
                    "Admin user Logged In Successfully"
                )
            );
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

    // description    Admin logout
    // route          POST /api/v1/admin/logout
    adminLogout = asyncHandler(async (req, res) => {
        console.log("hello4");
    });

    // description    Edit Profile
    // route          Patch /api/v1/admin/edit-profile
    editProfile = asyncHandler(async (req, res) => {
        console.log("hello3");
    });

    // description    Admin view profile
    // route          Get /api/v1/admin/view-profile
    viewProfile = asyncHandler(async (req, res) => {
        const adminId = req.admin._id;
        const admin = await MODEL.AdminUser.findById(adminId).select("name mobile");
        if (!admin) {
            throw new ApiError(404, "User not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, admin, "Fetch Profile details successfully"));
    });
}

export const AdminController = new Controller();
