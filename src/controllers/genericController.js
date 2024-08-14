import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";

class Controller {
    addGeneric = asyncHandler(async (req, res) => {});
    getGeneric = asyncHandler(async (req, res) => {});
    getByIdGeneric = asyncHandler(async (req, res) => {});
    updateGeneric = asyncHandler(async (req, res) => {});
    deleteGeneric = asyncHandler(async (req, res) => {});
}

export const generic = new Controller();
