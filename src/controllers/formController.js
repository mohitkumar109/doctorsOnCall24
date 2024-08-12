import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

class Controller {
    addForm = asyncHandler(async (req, res) => {});
    getForm = asyncHandler(async (req, res) => {});
    getByIdForm = asyncHandler(async (req, res) => {});
    updateForm = asyncHandler(async (req, res) => {});
    deleteForm = asyncHandler(async (req, res) => {});
}

export const form = new Controller();
