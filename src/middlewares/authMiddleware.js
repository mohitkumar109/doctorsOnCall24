import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { config } from "../common/config.js";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, _, next) => {
    const token =
        req.cookies?.accessToken || (req.header("Authorization") || "").replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized Request");
    }
    try {
        const decodeToken = jwt.verify(token, config.accessTokenSecret);

        // Log the decoded token (avoid logging sensitive information in production)
        //console.log("Decoded Token:", decodeToken);

        const user = await User.findById(decodeToken?._id).select("-password -refreshToken");

        // Log the user information (avoid logging sensitive information in production)
        //console.log("Authenticated User:", user);

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        // Log the error (avoid logging sensitive information in production)
        console.error("Authentication Error:", error);

        throw new ApiError(401, "Invalid access token by refresh");
    }
});
