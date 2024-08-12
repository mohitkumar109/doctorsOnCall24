import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
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
    // @desc    Register new user
    // route    POST /api/v1/users/register
    // @access  Public
    registerUser = asyncHandler(async (req, res) => {
        const { fullName, email, password, mobile, role } = req.body;
        if (!fullName || !email || !password || !mobile || !role) {
            throw new ApiError(400, "Required all fields");
        }
        const user = await User.findOne({ email });
        if (user) {
            throw new ApiError(400, "User already exist with this email");
        }
        const newUser = await User.create({
            fullName,
            email,
            password,
            mobile,
            role,
        });
        const createdUser = await User.findById(newUser._id).select("fullName email");
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }
        return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));
    });

    // @desc    Auth User/Set Token
    // route    POST /api/v1/users/login
    // @access  Public
    loginUser = asyncHandler(async (req, res) => {
        const { email, password, role } = req.body;
        if (!email || !password) {
            throw new ApiError(400, "Email and password is required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, "User does not exist");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(400, "Invalid user credentials");
        }

        if (role !== user.role) {
            throw new ApiError(400, "Account does not exist with current role");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.Node_ENV === "development",
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
                        user: loggedInUser,
                        accessToken,
                        refreshToken,
                    },
                    "User Logged In Successfully"
                )
            );
    });

    // @desc    Get User
    // route    Get /api/v1/users/
    // @access  Private
    getUser = asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return res.status(200).json(new ApiResponse(200, user, "fetch user details successfully"));
    });

    // @desc    Update User
    // route    Patch /api/v1/users/update
    // @access  Private
    updateUser = asyncHandler(async (req, res) => {
        console.log("hello3");
    });

    // @desc    Logout Users
    // route    POST /api/v1/users/logout
    // @access  Private
    logoutUser = asyncHandler(async (req, res) => {
        console.log("hello4");
    });
}

export const userController = new Controller();
