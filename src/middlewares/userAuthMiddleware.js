import { Dependencies } from "../packages/index.js";
import { asyncHandler, ApiError } from "../utils/index.js";
import { MODEL } from "../models/index.js";
import { config } from "../common/index.js";

export const userAuth = asyncHandler(async (req, _, next) => {
    const token =
        req.cookies?.accessToken || (req.header("Authorization") || "").replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthorized Request");
    try {
        const decodeToken = Dependencies.jwt.verify(token, config.accessTokenSecret);
        // Log the decoded token (avoid logging sensitive information in production)
        //console.log("Decoded Token:", decodeToken);
        const user = await MODEL.User.findById(decodeToken?._id).select("-password -refreshToken");
        // Log the user information (avoid logging sensitive information in production)
        //console.log("Authenticated User:", user);
        if (!user) throw new ApiError(401, "Invalid Access Token");
        req.user = user;
        next();
    } catch (error) {
        // Log the error (avoid logging sensitive information in production)
        //console.error("Authentication Error:", error);
        throw new ApiError(401, "Invalid access token by refresh");
    }
});
