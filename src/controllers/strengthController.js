import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";

class Controller {
    addStrength = asyncHandler(async (req, res) => {});
    getStrength = asyncHandler(async (req, res) => {});
    getByIdStrength = asyncHandler(async (req, res) => {});
    updateStrength = asyncHandler(async (req, res) => {});
    deleteStrength = asyncHandler(async (req, res) => {});
}

export const strength = new Controller();
