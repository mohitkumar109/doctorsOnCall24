import { asyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
import { MODEL } from "../../models/index.js";

// description    Admin Master Module
// route          POST /api/v1/admin/

class Controller {
    /*---------------Generic Name of Medicine----------------*/

    // description      Add Generic
    // route            POST /api/v1/admin/generic
    // access           Private
    addGeneric = asyncHandler(async (req, res) => {
        const { genericName } = req.body;
        if (!genericName) {
            throw new ApiError(404, "Generic name is required");
        }

        const generic = await MODEL.Generic.findOne({ genericName });
        if (generic) {
            throw new ApiError(400, "Generic name is already exits");
        }

        const createdGeneric = await MODEL.Generic.create({
            genericName,
            createdBy: req?.admin?._id,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, createdGeneric, "Generic name is created successfully"));
    });

    // description      Brand Generic
    // route            GET /api/v1/admin/generic
    // access           Private
    fetchGeneric = asyncHandler(async (req, res) => {
        const generic = await MODEL.Generic.find({});
        if (generic.length === 0) {
            throw new ApiError(401, "Generic name not found");
        }
        return res.status(200).json(new ApiResponse(200, generic, "All List of generic"));
    });

    // description      Fetch single generic by Id
    // route            GET /api/v1/admin/generic/:id
    // access           Private
    fetchGenericById = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const generic = await MODEL.Generic.findById(id);
        if (generic.length === 0) {
            throw new ApiError(401, "Generic name not found");
        }
        return res.status(200).json(new ApiResponse(200, generic, "All List of generic"));
    });

    // description      Update Generic
    // route            PATCH /api/v1/admin/generic/:id
    // access           Private
    updateGeneric = asyncHandler(async (req, res) => {});

    // description      Action on Generic
    // route            PULL /api/v1/admin/generic/actionOnGeneric
    // access           Private
    actionOnGeneric = asyncHandler(async (req, res) => {});

    // description      Delete Generic
    // route            delete /api/v1/admin/generic/:id
    // access           Private
    deleteGeneric = asyncHandler(async (req, res) => {});

    /*------------- Category Of Medicine--------------*/

    // description      Add Category
    // route            POST /api/v1/admin/category/add
    // access           Private
    addCategory = asyncHandler(async (req, res) => {});

    // description      Category listing
    // route            GET /api/v1/admin/category/
    // access           Private
    fetchCategory = asyncHandler(async (req, res) => {});

    // description      Fetch single category by id
    // route            GET /api/v1/admin/category/:id
    // access           Private
    fetchCategoryById = asyncHandler(async (req, res) => {});

    // description      Update Category
    // route            PATCH /api/v1/category/update/:id
    // access           Private
    updateCategory = asyncHandler(async (req, res) => {});

    // description      Action on Category
    // route            PATCH /api/v1/category/actionOnCategory
    // access           Private
    actionOnCategory = asyncHandler(async (req, res) => {});

    // description      Delete Category
    // route            delete /api/v1/category/:id
    // access           Private
    deleteCategory = asyncHandler(async (req, res) => {});

    /*---------------Brand Module----------------*/

    // description      Add Brand
    // route            POST /api/v1/admin/brand/add
    // access           Private
    addBrand = asyncHandler(async (req, res) => {});

    // description      Brand List
    // route            GET /api/v1/admin/brand
    // access           Private
    fetchBrand = asyncHandler(async (req, res) => {});

    // description      Fetch single brand by Id
    // route            GET /api/v1/admin/brand/:id
    // access           Private
    fetchBrandById = asyncHandler(async (req, res) => {});

    // description      Update brand
    // route            PATCH /api/v1/admin/brand/:id
    // access           Private
    updateBrand = asyncHandler(async (req, res) => {});

    // description      Action on Brand
    // route            PULL /api/v1/admin/brand/actionOnBrand
    // access           Private
    actionOnBrand = asyncHandler(async (req, res) => {});

    // description      Delete Brand
    // route            delete /api/v1/admin/brand/:id
    // access           Private
    deleteBrand = asyncHandler(async (req, res) => {});

    /*------------Strength of Medicine ----------------*/

    // description      Add Strength
    // route            POST /api/v1/admin/strength/add
    // access           Private
    addStrength = asyncHandler(async (req, res) => {});

    // description      Fetch Strength
    // route            GET /api/v1/admin/strength
    // access           Private
    fetchStrength = asyncHandler(async (req, res) => {});

    // description      Fetch single Strength by Id
    // route            GET /api/v1/admin/strength/:id
    // access           Private
    fetchStrengthById = asyncHandler(async (req, res) => {});

    // description      Update Strength
    // route            PATCH /api/v1/admin/strength/:id
    // access           Private
    updateStrength = asyncHandler(async (req, res) => {});

    // description      Action on Strength
    // route            PULL /api/v1/admin/strength/actionOnStrength
    // access           Private
    actionOnStrength = asyncHandler(async (req, res) => {});

    // description      Delete Strength
    // route            delete /api/v1/admin/strength/:id
    // access           Private
    deleteStrength = asyncHandler(async (req, res) => {});

    /*-------------Usage Of Medicine--------------*/

    // description      Add Usage
    // route            POST /api/v1/admin/usage/add
    // access           Private
    addUsage = asyncHandler(async (req, res) => {});

    // description      Fetch Usage
    // route            GET /api/v1/admin/usage
    // access           Private
    fetchUsage = asyncHandler(async (req, res) => {});

    // description      Fetch single Usage by Id
    // route            GET /api/v1/admin/usage/:id
    // access           Private
    fetchUsageById = asyncHandler(async (req, res) => {});

    // description      Update Usage
    // route            PATCH /api/v1/admin/usage/:id
    // access           Private
    updateUsage = asyncHandler(async (req, res) => {});

    // description      Action on Usage
    // route            PULL /api/v1/admin/usage/actionOnUsage
    // access           Private
    actionOnUsage = asyncHandler(async (req, res) => {});

    // description      Delete Usage
    // route            delete /api/v1/admin/usage/:id
    // access           Private
    deleteUsage = asyncHandler(async (req, res) => {});
}

export const AdminMasterController = new Controller();
