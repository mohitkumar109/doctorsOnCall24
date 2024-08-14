import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";

class Controller {
    addBrand = asyncHandler(async (req, res) => {});
    getBrand = asyncHandler(async (req, res) => {});
    getByIdBrand = asyncHandler(async (req, res) => {});
    updateBrand = asyncHandler(async (req, res) => {});
    deleteBrand = asyncHandler(async (req, res) => {});
}

export const brand = new Controller();
