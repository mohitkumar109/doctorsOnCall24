import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

class Controller {
    // @desc    Add Category
    // route    POST /api/v1/category/add
    // @access  Private
    addCategory = asyncHandler(async (req, res) => {});

    // @desc    Get Category
    // route    GET /api/v1/category/getCategory
    // @access  Private
    getCategory = asyncHandler(async (req, res) => {});

    // @desc    Get Category By Category Id
    // route    GET /api/v1/category/getCategory/:id
    // @access  Private
    getByIdCategory = asyncHandler(async (req, res) => {});

    // @desc    Update Category By Category Id
    // route    PATCH /api/v1/category/updateCategory/:id
    // @access  Private
    updateCategory = asyncHandler(async (req, res) => {});

    // @desc    Delete Category By Category Id
    // route    PATCH /api/v1/category/deleteCategory/:id
    // @access  Private
    deleteCategory = asyncHandler(async (req, res) => {});
}

export const category = new Controller();
