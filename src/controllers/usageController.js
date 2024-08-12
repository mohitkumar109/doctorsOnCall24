import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

class Controller {
    addUsage = asyncHandler(async (req, res) => {});
    getUsage = asyncHandler(async (req, res) => {});
    getByIdUsage = asyncHandler(async (req, res) => {});
    updateUsage = asyncHandler(async (req, res) => {});
    deleteUsage = asyncHandler(async (req, res) => {});
}

export const usage = new Controller();
