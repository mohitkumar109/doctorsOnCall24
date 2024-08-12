import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

class Controller {
    addStrength = asyncHandler(async (req, res) => {});
    getStrength = asyncHandler(async (req, res) => {});
    getByIdStrength = asyncHandler(async (req, res) => {});
    updateStrength = asyncHandler(async (req, res) => {});
    deleteStrength = asyncHandler(async (req, res) => {});
}

export const strength = new Controller();
