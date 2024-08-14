import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";

class Controller {
    addUsage = asyncHandler(async (req, res) => {});
    getUsage = asyncHandler(async (req, res) => {});
    getByIdUsage = asyncHandler(async (req, res) => {});
    updateUsage = asyncHandler(async (req, res) => {});
    deleteUsage = asyncHandler(async (req, res) => {});
}

export const usage = new Controller();
