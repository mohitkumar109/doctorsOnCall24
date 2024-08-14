import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";

class Controller {
    addForm = asyncHandler(async (req, res) => {});
    getForm = asyncHandler(async (req, res) => {});
    getByIdForm = asyncHandler(async (req, res) => {});
    updateForm = asyncHandler(async (req, res) => {});
    deleteForm = asyncHandler(async (req, res) => {});
}

export const form = new Controller();
