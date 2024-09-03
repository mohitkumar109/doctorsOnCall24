import { Dependencies } from "../../packages/index.js";
import { asyncHandler, ApiResponse, ApiError, modifyResponse } from "../../utils/index.js";
import { Helpers, PAGINATION_LIMIT } from "../../common/index.js";
import { MODEL } from "../../models/index.js";

// description    Admin Master Module
// route          POST /api/v1/admin/

class Controller {
    /*---------------Generic Name of Medicine----------------*/

    // description      Add Generic
    // route            POST /api/v1/admin/generic
    // access           Private
    addGeneric = asyncHandler(async (req, res) => {
        const { genericName, status } = req.body;
        if (!genericName) {
            throw new ApiError(404, "Generic name is required");
        }

        const generic = await MODEL.Generic.findOne({ genericName });
        if (generic) {
            throw new ApiError(400, "Generic name is already exits");
        }

        const createdGeneric = await MODEL.Generic.create({
            genericName,
            status: status || "active",
            createdBy: req?.user?._id,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, createdGeneric, "Generic name is created successfully"));
    });

    // description      Brand Generic
    // route            GET /api/v1/admin/generic
    // access           Private
    fetchGeneric = asyncHandler(async (req, res) => {
        const filter = {};
        const { search, status, sorting } = req.query;

        if (search) {
            filter.genericName = { $regex: search, $options: "i" };
        }

        if (status) {
            filter.status = status;
        }

        //Sorting
        let sortOption = {};
        switch (sorting) {
            case "1":
                sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
                break;
            case "2":
                sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
                break;
            case "3":
                sortOption.genericName = 1;
                break;
            case "4":
                sortOption.genericName = -1;
                break;
            default:
                sortOption.createdAt = -1;
                break;
        }

        //Pagination
        const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        const skip = parseInt(req.query.page - 1) * limit;

        const query = await MODEL.Generic.find(filter, { ...modifyResponse, checked: 0 })
            .sort(sortOption)
            .limit(limit)
            .skip(skip)
            .populate("createdBy", "fullName")
            .populate("updatedBy", "fullName");

        const totalResults = await MODEL.Generic.find(filter).countDocuments();
        const totalPages = Math.ceil(totalResults / limit);

        if (!query) {
            throw new ApiError(400, "Generic name not found");
        }

        const pagination = {
            totalResult: totalResults,
            totalPages: totalPages,
            currentPage: parseInt(req.query.page),
        };

        return res
            .status(200)
            .json(new ApiResponse(200, { results: query, pagination }, "All List of generic name"));
    });

    // description      Fetch single generic by Id
    // route            GET /api/v1/admin/generic/:id
    // access           Private
    fetchGenericById = asyncHandler(async (req, res) => {
        const genId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(genId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const generic = await MODEL.Generic.findById(genId);
        if (!generic) {
            throw new ApiError(400, "Generic name not found");
        }
        return res.status(200).json(new ApiResponse(200, generic, "All List of generic"));
    });

    // description      Fetch generic by active
    // route            GET /api/v1/admin/generic-select
    // access           Private
    fetchGenericSelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Generic.find({ status: "active" }, { genericName: 1 });
        if (!result) {
            throw new ApiError(404, "record not fund");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, { data: result }, "Selected active record"));
    });

    // description      Update Generic
    // route            PATCH /api/v1/admin/generic/:id
    // access           Private
    updateGeneric = asyncHandler(async (req, res) => {
        const genId = req.params.id;
        const { genericName, status } = req.body;

        if (!Dependencies.mongoose.isValidObjectId(genId)) {
            throw new ApiError(400, "This is not a valid id");
        }

        const exist = await MODEL.Generic.findById(genId);
        if (!exist) {
            throw new ApiError(400, "This Id is not exist in database");
        }

        // Check if another record with the same genericName exists (excluding the current record)
        const duplicate = await MODEL.Generic.findOne({ genericName, _id: { $ne: genId } });
        if (duplicate) {
            throw new ApiError(400, "Generic name already exists");
        }

        const updated = await MODEL.Generic.findByIdAndUpdate(
            genId,
            {
                $set: { genericName, status, updatedBy: req.user._id },
            },
            { new: true }
        );

        return res.status(200).json(new ApiResponse(200, updated, "Updated Successfully"));
    });

    // description      Action on Generic
    // route            PATCH /api/v1/admin/generic/actionOnGeneric/?status=Inactive
    // route            PATCH /api/v1/admin/generic/actionOnGeneric/id/?status=Inactive
    // access           Private
    actionOnGeneric = asyncHandler(async (req, res) => {
        const { ids } = req.body;
        const action = ids
            ? Helpers.actionOnMultipleIds(ids.split(","), req.params.status, MODEL.Generic)
            : Helpers.actionOnSingleId(req.params.id, req.params.status, MODEL.Generic);
        await action;
        const successMessage = ids
            ? `Selected record(s) ${req.params.status} successfully`
            : `Selected ${req.params.status} successfully`;
        return res.status(200).json(new ApiResponse(200, {}, successMessage));
    });

    // description      Delete Generic
    // route            delete /api/v1/admin/generic/:id
    // access           Private
    deleteGeneric = asyncHandler(async (req, res) => {
        const genId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(genId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Generic.findById(genId);
        if (!exist) {
            throw new ApiError(400, "This Id is not exist in database");
        }
        const deleted = await MODEL.Generic.findByIdAndDelete(genId);
        return res.status(200).json(new ApiResponse(200, deleted, "Deleted Successfully"));
    });

    /*------------- Category Of Medicine--------------*/

    // description      Add Category
    // route            POST /api/v1/admin/category/add
    // access           Private
    addCategory = asyncHandler(async (req, res) => {
        const { categoryName, status } = req.body;
        if (!categoryName) {
            throw new ApiError(404, "Medicine category is required");
        }

        const category = await MODEL.Category.findOne({ categoryName });
        if (category) {
            throw new ApiError(400, "category name is already exits");
        }

        const createdCategory = await MODEL.Category.create({
            categoryName,
            status: status || "active",
            createdBy: req?.user?._id,
        });

        return res
            .status(201)
            .json(
                new ApiResponse(201, createdCategory, "Medicine category is created successfully")
            );
    });

    // description      Category listing
    // route            GET /api/v1/admin/category/
    // access           Private
    fetchCategory = asyncHandler(async (req, res) => {
        const filter = {};
        const { search, status, sorting } = req.query;

        if (search) {
            filter.categoryName = { $regex: search, $options: "i" };
        }

        if (status) {
            filter.status = status;
        }

        //Sorting
        let sortOption = {};
        switch (sorting) {
            case "1":
                sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
                break;
            case "2":
                sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
                break;
            case "3":
                sortOption.categoryName = 1;
                break;
            case "4":
                sortOption.categoryName = -1;
                break;
            default:
                sortOption.createdAt = 1;
                break;
        }

        //Pagination
        const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        const skip = parseInt(req.query.page - 1) * limit;

        const query = await MODEL.Category.find(filter, { ...modifyResponse })
            .sort(sortOption)
            .limit(limit)
            .skip(skip)
            .populate("createdBy", "fullName")
            .populate("updatedBy", "fullName");

        const totalResults = await MODEL.Category.find(filter).countDocuments();
        const totalPages = Math.ceil(totalResults / limit);

        if (!query) {
            throw new ApiError(400, "Category is not found");
        }

        const pagination = {
            totalResult: totalResults,
            totalPages: totalPages,
            currentPage: parseInt(req.query.page),
        };

        return res
            .status(200)
            .json(new ApiResponse(200, { results: query, pagination }, "All list of category"));
    });

    // description      Fetch single category by id
    // route            GET /api/v1/admin/category/:id
    // access           Private
    fetchCategoryById = asyncHandler(async (req, res) => {
        const catId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(catId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const category = await MODEL.Category.findById(catId);
        if (!category) {
            throw new ApiError(400, "Category not found");
        }
        return res.status(200).json(new ApiResponse(200, category, "All list of category"));
    });

    fetchCategorySelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Category.find({ status: "active" }, { categoryName: 1 });
        if (!result) {
            throw new ApiError(404, "record not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, { data: result }, "Selected active record"));
    });

    // description      Update Category
    // route            PATCH /api/v1/category/update/:id
    // access           Private
    updateCategory = asyncHandler(async (req, res) => {
        const catId = req.params.id;
        const { categoryName, status } = req.body;

        if (!Dependencies.mongoose.isValidObjectId(catId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Category.findById(catId);
        if (!exist) {
            throw new ApiError(400, "This Id is not exist in database");
        }

        // Check if another record with the same categoryName exists (excluding the current record)
        const duplicate = await MODEL.Category.findOne({ categoryName, _id: { $ne: catId } });
        if (duplicate) {
            throw new ApiError(400, "Category name already exists");
        }

        const updated = await MODEL.Category.findByIdAndUpdate(
            catId,
            {
                $set: { categoryName, status, updatedBy: req.user._id },
            },
            { new: true }
        );

        return res
            .status(200)
            .json(new ApiResponse(200, updated, "Category Updated Successfully!"));
    });

    // description      Delete Category
    // route            Delete /api/v1/category/delete/:id
    // access           Private
    deleteCategory = asyncHandler(async (req, res) => {
        const catId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(catId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Category.findById(catId);
        if (!exist) {
            throw new ApiError(400, "This Id is not exist in database");
        }
        const deleted = await MODEL.Category.findByIdAndDelete(catId);
        return res.status(200).json(new ApiResponse(200, deleted, "Deleted Successfully"));
    });

    // description      Action on Category
    // route            PATCH /api/v1/category/actionOnCategory
    // access           Private
    actionOnCategory = asyncHandler(async (req, res) => {
        const { ids } = req.body;
        const action = ids
            ? Helpers.actionOnMultipleIds(ids.split(","), req.params.status, MODEL.Category)
            : Helpers.actionOnSingleId(req.params.id, req.params.status, MODEL.Category);
        await action;
        const successMessage = ids
            ? `Selected record(s) ${req.params.status} successfully`
            : `Selected ${req.params.status} successfully`;
        return res.status(200).json(new ApiResponse(200, {}, successMessage));
    });

    /*---------------Brand Module----------------*/

    // description      Add Brand
    // route            POST /api/v1/admin/brand/add
    // access           Private
    addBrand = asyncHandler(async (req, res) => {
        const { brandName, status } = req.body;
        if (!brandName) {
            throw new ApiError(404, "Brand name is required");
        }
        const exist = await MODEL.Brand.findOne({ brandName });
        if (exist) {
            throw new ApiError(400, "Brand name already exist");
        }
        const brand = await MODEL.Brand.create({
            brandName,
            status: status || "active",
            createdBy: req?.user?._id,
        });
        return res.status(201).json(new ApiResponse(201, brand, "Brand name created successfully"));
    });

    // description      Brand List
    // route            GET /api/v1/admin/brand
    // access           Private
    fetchBrand = asyncHandler(async (req, res) => {
        const filter = {};
        const { search, status, sorting } = req.query;

        if (search) {
            filter.brandName = { $regex: search, $options: "i" };
        }

        if (status) {
            filter.status = status;
        }

        //Sorting
        let sortOption = {};
        switch (sorting) {
            case "1":
                sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
                break;
            case "2":
                sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
                break;
            case "3":
                sortOption.brandName = 1;
                break;
            case "4":
                sortOption.brandName = -1;
                break;
            default:
                sortOption.createdAt = -1;
                break;
        }

        //Pagination
        const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        const skip = parseInt(req.query.page - 1) * limit;

        const query = await MODEL.Brand.find(filter, { ...modifyResponse })
            .sort(sortOption)
            .limit(limit)
            .skip(skip)
            .populate("createdBy", "fullName")
            .populate("updatedBy", "fullName");
        const totalResults = await MODEL.Brand.find(filter, { ...modifyResponse }).countDocuments();
        const totalPages = Math.ceil(totalResults / limit);

        if (!query) {
            throw new ApiError(400, "Brand name is not found");
        }

        const pagination = {
            totalResult: totalResults,
            totalPages: totalPages,
            currentPage: parseInt(req.query.page),
        };

        return res
            .status(200)
            .json(new ApiResponse(200, { results: query, pagination }, "All list of brand"));
    });

    // description      Fetch single brand by Id
    // route            GET /api/v1/admin/brand/:id
    // access           Private
    fetchBrandById = asyncHandler(async (req, res) => {
        const brandId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(brandId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const brand = await MODEL.Brand.findById(brandId, { ...modifyResponse });
        if (!brand) {
            throw new ApiError(400, "Brand not found");
        }
        return res.status(200).json(new ApiResponse(200, brand, "All list of brand"));
    });

    fetchBrandSelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Brand.find({ status: "active" }, { brandName: 1 });
        if (!result) {
            throw new ApiError(404, "record not fund");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, { data: result }, "Selected active record"));
    });

    // description      Update brand
    // route            PATCH /api/v1/admin/brand/:id
    // access           Private
    updateBrand = asyncHandler(async (req, res) => {
        const brandId = req.params.id;
        const { brandName, status } = req.body;

        if (!Dependencies.mongoose.isValidObjectId(brandId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Brand.findById(brandId);
        if (!exist) {
            throw new ApiError(400, "This Id is not exist in database");
        }

        // Check if another record with the same brandName exists (excluding the current record)
        const duplicate = await MODEL.Brand.findOne({ brandName, _id: { $ne: brandId } });
        if (duplicate) {
            throw new ApiError(400, "Brand name already exists");
        }

        const updated = await MODEL.Brand.findByIdAndUpdate(
            brandId,
            {
                $set: { brandName, status, updatedBy: req.user._id },
            },
            { new: true }
        );

        return res.status(200).json(new ApiResponse(200, updated, "Brand updated Successfully!"));
    });

    // description      Action on Brand
    // route            PULL /api/v1/admin/brand/actionOnBrand
    // access           Private
    actionOnBrand = asyncHandler(async (req, res) => {
        const { ids } = req.body;
        const action = ids
            ? Helpers.actionOnMultipleIds(ids.split(","), req.params.status, MODEL.Brand)
            : Helpers.actionOnSingleId(req.params.id, req.params.status, MODEL.Brand);
        await action;
        const successMessage = ids
            ? `Selected record(s) ${req.params.status} successfully`
            : `Selected ${req.params.status} successfully`;
        return res.status(200).json(new ApiResponse(200, {}, successMessage));
    });

    /*------------strength of Medicine ----------------*/

    // description      Add Strength
    // route            POST /api/v1/admin/strength/add
    // access           Private
    addStrength = asyncHandler(async (req, res) => {
        const { strengthName, status } = req.body;
        if (!strengthName) {
            throw new ApiError(404, "Strength is required");
        }
        const exist = await MODEL.Strength.findOne({ strengthName });
        if (exist) {
            throw new ApiError(400, "Strength already exist");
        }
        const strength = await MODEL.Strength.create({
            strengthName,
            status: status || "active",
            createdBy: req?.user?._id,
        });
        return res
            .status(201)
            .json(new ApiResponse(201, strength, "Strength created successfully"));
    });

    // description      Fetch Strength
    // route            GET /api/v1/admin/strength
    // access           Private
    fetchStrength = asyncHandler(async (req, res) => {
        const filter = {};
        const { search, status, sorting } = req.query;

        if (search) {
            filter.strengthName = { $regex: search, $options: "i" };
        }

        if (status) {
            filter.status = status;
        }

        //Sorting
        let sortOption = {};
        switch (sorting) {
            case "1":
                sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
                break;
            case "2":
                sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
                break;
            case "3":
                sortOption.strengthName = 1;
                break;
            case "4":
                sortOption.strengthName = -1;
                break;
            default:
                sortOption.createdAt = -1;
                break;
        }

        //Pagination
        const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        const skip = parseInt(req.query.page - 1) * limit;

        const query = await MODEL.Strength.find(filter)
            .sort(sortOption)
            .limit(limit)
            .skip(skip)
            .populate("createdBy", "fullName")
            .populate("updatedBy", "fullName");
        const totalResults = await MODEL.Strength.find(filter).countDocuments();
        const totalPages = Math.ceil(totalResults / limit);

        if (!query) {
            throw new ApiError(400, "Strength is not found");
        }

        const pagination = {
            totalResult: totalResults,
            totalPages: totalPages,
            currentPage: parseInt(req.query.page),
        };

        return res
            .status(200)
            .json(new ApiResponse(200, { results: query, pagination }, "All list of strength"));
    });

    // description      Fetch single Strength by Id
    // route            GET /api/v1/admin/strength/:id
    // access           Private
    fetchStrengthById = asyncHandler(async (req, res) => {
        const strengthId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(strengthId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const strength = await MODEL.Strength.findById(strengthId);
        if (!strength) {
            throw new ApiError(400, "Strength not found");
        }
        return res.status(200).json(new ApiResponse(200, strength, "All list of strength"));
    });

    fetchStrengthSelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Strength.find({ status: "active" }, { strengthName: 1 });
        if (!result) {
            throw new ApiError(404, "record not fund");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, { data: result }, "Selected active record"));
    });

    // description      Update Strength
    // route            PATCH /api/v1/admin/strength/:id
    // access           Private
    updateStrength = asyncHandler(async (req, res) => {
        const strengthId = req.params.id;
        const { strengthName, status } = req.body;

        if (!Dependencies.mongoose.isValidObjectId(strengthId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Strength.findById(strengthId);
        if (!exist) {
            throw new ApiError(400, "This Id is not exist in database");
        }

        // Check if another record with the same strengthName exists (excluding the current record)
        const duplicate = await MODEL.Strength.findOne({ strengthName, _id: { $ne: strengthId } });
        if (duplicate) {
            throw new ApiError(400, "Strength name already exists");
        }

        const updated = await MODEL.Strength.findByIdAndUpdate(
            strengthId,
            {
                $set: { strengthName, status, updatedBy: req.user._id },
            },
            { new: true }
        );

        return res
            .status(200)
            .json(new ApiResponse(200, updated, "Strength updated Successfully!"));
    });

    // description      Action on Strength
    // route            PULL /api/v1/admin/strength/actionOnStrength
    // access           Private
    actionOnStrength = asyncHandler(async (req, res) => {
        const { ids } = req.body;
        const action = ids
            ? Helpers.actionOnMultipleIds(ids.split(","), req.params.status, MODEL.Strength)
            : Helpers.actionOnSingleId(req.params.id, req.params.status, MODEL.Strength);
        await action;
        const successMessage = ids
            ? `Selected record(s) ${req.params.status} successfully`
            : `Selected ${req.params.status} successfully`;
        return res.status(200).json(new ApiResponse(200, {}, successMessage));
    });

    /*-------------Usage Of Medicine--------------*/

    // description      Add Usage
    // route            POST /api/v1/admin/usage/add
    // access           Private
    addUsage = asyncHandler(async (req, res) => {
        const { usageName, status } = req.body;
        if (!usageName) {
            throw new ApiError(404, "Usage name is required");
        }

        const exist = await MODEL.Usage.findOne({ usageName });
        if (exist) {
            throw new ApiError(404, "Usage name already exist");
        }

        const usage = await MODEL.Usage.create({
            usageName,
            status: status || "active",
            createdBy: req?.user?._id,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, usage, "Usage name is created Successfully"));
    });

    // description      Fetch Usage
    // route            GET /api/v1/admin/usage
    // access           Private
    fetchUsage = asyncHandler(async (req, res) => {
        const filter = {};
        const { search, status, sorting } = req.query;

        if (search) {
            filter.usageName = { $regex: search, $options: "i" };
        }

        if (status) {
            filter.status = status;
        }

        //Sorting
        let sortOption = {};
        switch (sorting) {
            case "1":
                sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
                break;
            case "2":
                sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
                break;
            case "3":
                sortOption.usageName = 1;
                break;
            case "4":
                sortOption.usageName = -1;
                break;
            default:
                sortOption.createdAt = -1;
                break;
        }

        //Pagination
        const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        const skip = parseInt(req.query.page - 1) * limit;

        const query = await MODEL.Usage.find(filter)
            .sort(sortOption)
            .limit(limit)
            .skip(skip)
            .populate("createdBy", "fullName")
            .populate("updatedBy", "fullName");
        const totalResults = await MODEL.Usage.find(filter).countDocuments();
        const totalPages = Math.ceil(totalResults / limit);

        if (!query) {
            throw new ApiError(400, "Usage is not found");
        }

        const pagination = {
            totalResult: totalResults,
            totalPages: totalPages,
            currentPage: parseInt(req.query.page),
        };

        return res
            .status(200)
            .json(new ApiResponse(200, { results: query, pagination }, "All list of usage"));
    });

    // description      Fetch single Usage by Id
    // route            GET /api/v1/admin/usage/:id
    // access           Private
    fetchUsageById = asyncHandler(async (req, res) => {
        const usageId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(usageId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const usage = await MODEL.Usage.findById(usageId);
        if (!usage) {
            throw new ApiError(400, "Usage not found");
        }
        return res.status(200).json(new ApiResponse(200, usage, "All list of usage"));
    });

    fetchUsageSelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Usage.find({ status: "active" }, { usageName: 1 });
        if (!result) {
            throw new ApiError(404, "record not fund");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, { data: result }, "Selected active record"));
    });

    // description      Update Usage
    // route            PATCH /api/v1/admin/usage/:id
    // access           Private
    updateUsage = asyncHandler(async (req, res) => {
        const usageId = req.params.id;
        const { usageName, status } = req.body;

        if (!Dependencies.mongoose.isValidObjectId(usageId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Usage.findById(usageId);
        if (!exist) {
            throw new ApiError(400, "This Id is not exist in database");
        }

        // Check if another record with the same usageName exists (excluding the current record)
        const duplicate = await MODEL.Usage.findOne({ usageName, _id: { $ne: usageId } });
        if (duplicate) {
            throw new ApiError(400, "Usage name already exists");
        }

        const updated = await MODEL.Usage.findByIdAndUpdate(
            usageId,
            {
                $set: { usageName, status, updatedBy: req.user._id },
            },
            { new: true }
        );

        return res.status(200).json(new ApiResponse(200, updated, "Usage updated Successfully!"));
    });

    // description      Action on Usage
    // route            PULL /api/v1/admin/usage/actionOnUsage
    // access           Private
    actionOnUsage = asyncHandler(async (req, res) => {
        const { ids } = req.body;
        const action = ids
            ? Helpers.actionOnMultipleIds(ids.split(","), req.params.status, MODEL.Usage)
            : Helpers.actionOnSingleId(req.params.id, req.params.status, MODEL.Usage);
        await action;
        const successMessage = ids
            ? `Selected record(s) ${req.params.status} successfully`
            : `Selected ${req.params.status} successfully`;
        return res.status(200).json(new ApiResponse(200, {}, successMessage));
    });

    /*-------------Medicine Store--------------*/

    addStore = asyncHandler(async (req, res) => {
        const { storeName, phone, address, state, city, pin, personName, email, mobile, status } =
            req.body;
        if (
            !storeName ||
            !phone ||
            !address ||
            !state ||
            !city ||
            !pin ||
            !personName ||
            !email ||
            !mobile
        )
            throw new ApiError(404, "All Fields are required");

        const alreadyExist = await MODEL.Store.findOne({ storeName });
        if (alreadyExist) {
            throw new ApiError(400, "Store name already exist in records");
        }

        const store = await MODEL.Store.create({
            storeName,
            "location.phone": phone,
            "location.address": address,
            "location.state": state,
            "location.city": city,
            "location.pin": pin,
            "contactPerson.personName": personName,
            "contactPerson.email": email,
            "contactPerson.mobile": mobile,
            status: status || "active",
            createdBy: req?.user?._id,
        });

        return res.status(201).json(new ApiResponse(201, store, "Store created successfully"));
    });

    fetchStore = asyncHandler(async (req, res) => {
        // const filter = {};
        // const { search, status, sorting } = req.query;

        // if (search) {
        //     filter.storeName = { $regex: search, $options: "i" };
        // }

        // if (status) {
        //     filter.status = status;
        // }

        // //Sorting
        // let sortOption = {};
        // switch (sorting) {
        //     case "1":
        //         sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
        //         break;
        //     case "2":
        //         sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
        //         break;
        //     case "3":
        //         sortOption.storeName = 1;
        //         break;
        //     case "4":
        //         sortOption.storeName = -1;
        //         break;
        //     default:
        //         sortOption.createdAt = -1;
        //         break;
        // }

        // //Pagination
        // const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        // const skip = parseInt(req.query.page - 1) * limit;

        // const query = await MODEL.Store.find(filter)
        //     .sort(sortOption)
        //     .limit(limit)
        //     .skip(skip)
        //     .populate("createdBy", "fullName")
        //     .populate("updatedBy", "fullName")
        //     .select(
        //         "-checked -updatedAt -__v -location.state -location.city -location.pin -contactPerson.personName -contactPerson.mobile"
        //     );
        // const totalResults = await MODEL.Store.find(filter).countDocuments();
        // const totalPages = Math.ceil(totalResults / limit);

        // if (!query) {
        //     throw new ApiError(400, "Store is not found");
        // }

        // const pagination = {
        //     totalResult: totalResults,
        //     totalPages: totalPages,
        //     currentPage: parseInt(req.query.page),
        // };

        const { search, status, sorting } = req.query;

        let filter = {};
        if (search) {
            filter.storeName = { $regex: search, $options: "i" };
        }

        if (status) {
            filter.status = status;
        }

        // Sorting
        let sortOption = {};
        switch (sorting) {
            case "1":
                sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
                break;
            case "2":
                sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
                break;
            case "3":
                sortOption.storeName = 1;
                break;
            case "4":
                sortOption.storeName = -1;
                break;
            default:
                sortOption.createdAt = -1;
                break;
        }

        //Pagination
        const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        const skip = parseInt(req.query.page - 1) * limit;

        // Aggregation Pipeline

        const pipeline = [
            { $match: filter },
            { $sort: sortOption },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdByUser",
                },
            },

            {
                $lookup: {
                    from: "users",
                    localField: "updatedBy",
                    foreignField: "_id",
                    as: "updatedByUser",
                },
            },

            {
                $addFields: {
                    createdByUser: { $arrayElemAt: ["$createdByUser", 0] },
                    updatedByUser: { $arrayElemAt: ["$updatedByUser", 0] },
                },
            },
            {
                $project: {
                    storeName: 1,
                    status: 1,
                    createdAt: 1,
                    "location.address": 1,
                    "location.phone": 1,
                    "contactPerson.email": 1,
                    "createdByUser.fullName": 1,
                    "updatedByUser.fullName": 1,
                },
            },
        ];

        //Query
        const query = await MODEL.Store.aggregate(pipeline);

        // Total Items and Pages
        const totalResult = await MODEL.Store.countDocuments(filter);
        const totalPages = Math.ceil(totalResult / limit);

        const pagination = {
            totalResult: totalResult,
            totalPages: totalPages,
            currentPage: parseInt(req.query.page),
        };

        return res
            .status(200)
            .json(new ApiResponse(200, { results: query, pagination }, "All list of store"));
    });

    fetchStoreById = asyncHandler(async (req, res) => {
        const storeId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(storeId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const store = await MODEL.Store.findById(storeId);
        if (!store) {
            throw new ApiError(400, "Store not found");
        }
        return res.status(200).json(new ApiResponse(200, store, "Get store"));
    });

    fetchSelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Store.find({ status: "active" }, { storeName: 1 });
        if (!result) {
            throw new ApiError(404, "Active record not found");
        }
        return res.status(200).json(new ApiResponse(200, { data: result }, "Get active store"));
    });

    updateStore = asyncHandler(async (req, res) => {
        const storeId = req.params.id;
        const { storeName, phone, address, state, city, pin, personName, email, mobile, status } =
            req.body;

        if (!Dependencies.mongoose.isValidObjectId(storeId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Store.findById(storeId);
        if (!exist) {
            throw new ApiError(400, "This id is not exist in database");
        }

        // Check if another record with the same storeName exists (excluding the current record)
        const duplicate = await MODEL.Store.findOne({ storeName, _id: { $ne: storeId } });
        if (duplicate) {
            throw new ApiError(400, "Store name already exists");
        }

        const updated = await MODEL.Store.findByIdAndUpdate(
            storeId,
            {
                $set: {
                    storeName,
                    "location.phone": phone,
                    "location.address": address,
                    "location.state": state,
                    "location.city": city,
                    "location.pin": pin,
                    "contactPerson.personName": personName,
                    "contactPerson.email": email,
                    "contactPerson.mobile": mobile,
                    status: status || "active",
                    updatedBy: req?.user?._id,
                },
            },
            { new: true }
        );

        return res.status(200).json(new ApiResponse(200, updated, "Store updated Successfully!"));
    });

    actionOnStore = asyncHandler(async (req, res) => {
        const { ids } = req.body;
        const action = ids
            ? Helpers.actionOnMultipleIds(ids.split(","), req.params.status, MODEL.Store)
            : Helpers.actionOnSingleId(req.params.id, req.params.status, MODEL.Store);
        await action;
        const successMessage = ids
            ? `Selected record(s) ${req.params.status} successfully`
            : `Selected ${req.params.status} successfully`;
        return res.status(200).json(new ApiResponse(200, {}, successMessage));
    });

    /*-------------Medicine Inventory--------------*/

    addMedicine = asyncHandler(async (req, res) => {
        const {
            name,
            genericId,
            categoryId,
            brandId,
            strengthId,
            usageId,
            quantity,
            price,
            expireDate,
            status,
        } = req.body;

        if (
            !name ||
            !genericId ||
            !categoryId ||
            !brandId ||
            !strengthId ||
            !usageId ||
            !quantity ||
            !price ||
            !expireDate
        ) {
            throw new ApiError(404, "All Fields are required for medicine");
        }

        const alreadyExist = await MODEL.Medicine.findOne({ name });
        if (alreadyExist) {
            throw new ApiError(400, "Medicine already exist in records");
        }

        const medicine = await MODEL.Medicine.create({
            name,
            genericId,
            categoryId,
            brandId,
            strengthId,
            usageId,
            quantity,
            price,
            expireDate,
            status: status || "active",
            createdBy: req?.user?._id,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, medicine, "Medicine created successfully!"));
    });

    fetchMedicine = asyncHandler(async (req, res) => {
        const { search, status, sorting } = req.query;

        let filter = {};
        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (status) {
            filter.status = status;
        }

        // Sorting
        let sortOption = {};
        switch (sorting) {
            case "1":
                sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
                break;
            case "2":
                sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
                break;
            case "3":
                sortOption.name = 1;
                break;
            case "4":
                sortOption.name = -1;
                break;
            default:
                sortOption.createdAt = -1;
                break;
        }

        //Pagination
        const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        const skip = parseInt(req.query.page - 1) * limit;

        // Aggregation Pipeline

        const pipeline = [
            { $match: filter },
            { $sort: sortOption },
            { $skip: skip },
            { $limit: limit },

            {
                $lookup: {
                    from: "generics",
                    localField: "genericId",
                    foreignField: "_id",
                    as: "generic",
                },
            },

            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category",
                },
            },

            {
                $lookup: {
                    from: "brands",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand",
                },
            },

            {
                $lookup: {
                    from: "strengths",
                    localField: "strengthId",
                    foreignField: "_id",
                    as: "strength",
                },
            },

            {
                $lookup: {
                    from: "usages",
                    localField: "usageId",
                    foreignField: "_id",
                    as: "usage",
                },
            },

            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdByUser",
                },
            },

            {
                $lookup: {
                    from: "users",
                    localField: "updatedBy",
                    foreignField: "_id",
                    as: "updatedByUser",
                },
            },

            {
                $addFields: {
                    generic: { $arrayElemAt: ["$generic", 0] },
                    category: { $arrayElemAt: ["$category", 0] },
                    brand: { $arrayElemAt: ["$brand", 0] },
                    strength: { $arrayElemAt: ["$strength", 0] },
                    usage: { $arrayElemAt: ["$usage", 0] },
                    createdByUser: { $arrayElemAt: ["$createdByUser", 0] },
                    updatedByUser: { $arrayElemAt: ["$updatedByUser", 0] },
                },
            },
            {
                $project: {
                    name: 1,
                    quantity: 1,
                    price: 1,
                    expireDate: 1,
                    status: 1,
                    createdAt: 1,
                    "generic.genericName": 1,
                    "category.categoryName": 1,
                    "brand.brandName": 1,
                    "strength.strengthName": 1,
                    "usage.usageName": 1,
                    "createdByUser.fullName": 1,
                    "updatedByUser.fullName": 1,
                },
            },
        ];

        //Query
        const query = await MODEL.Medicine.aggregate(pipeline);

        // Total Items and Pages
        const totalResult = await MODEL.Medicine.countDocuments(filter);
        const totalPages = Math.ceil(totalResult / limit);

        const pagination = {
            totalResult: totalResult,
            totalPages: totalPages,
            currentPage: parseInt(req.query.page),
        };

        return res
            .status(200)
            .json(new ApiResponse(200, { results: query, pagination }, "Fetch all medicine"));
    });

    fetchMedicineById = asyncHandler(async (req, res) => {
        const medicineId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(medicineId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const medicine = await MODEL.Medicine.findById(medicineId, {
            ...modifyResponse,
        });

        if (!medicine) {
            throw new ApiError(400, "medicine not found");
        }

        return res.status(200).json(new ApiResponse(200, medicine, "Get medicine"));
    });

    fetchMedicineSelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Medicine.find({ status: "active" }, { name: 1 });
        if (!result) {
            throw new ApiError(404, "Active record not found");
        }
        return res.status(200).json(new ApiResponse(200, { data: result }, "Get active record"));
    });

    updateMedicine = asyncHandler(async (req, res) => {
        const medicineId = req.params.id;
        const {
            name,
            genericId,
            categoryId,
            brandId,
            strengthId,
            usageId,
            quantity,
            price,
            expireDate,
            status,
        } = req.body;

        if (!Dependencies.mongoose.isValidObjectId(medicineId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Medicine.findById(medicineId);
        if (!exist) {
            throw new ApiError(400, "This id is not exist in database");
        }

        // Check if another record with the same Medicine Name exists (excluding the current record)
        const duplicate = await MODEL.Medicine.findOne({
            name,
            _id: { $ne: medicineId },
        });
        if (duplicate) {
            throw new ApiError(400, "Medicine already exist in records!");
        }

        const updated = await MODEL.Medicine.findByIdAndUpdate(
            medicineId,
            {
                $set: {
                    name,
                    genericId,
                    categoryId,
                    brandId,
                    strengthId,
                    usageId,
                    quantity,
                    price,
                    expireDate,
                    status: status || "active",
                    updatedBy: req?.user?._id,
                },
            },
            { new: true }
        );
        //const data = await MODEL.MedicineProduct.findById(medicineId, { genericName: 1 });
        return res
            .status(200)
            .json(new ApiResponse(200, updated, "Medicine updated successfully!"));
    });

    actionOnMedicine = asyncHandler(async (req, res) => {
        const { ids } = req.body;
        const action = ids
            ? Helpers.actionOnMultipleIds(ids.split(","), req.params.status, MODEL.Medicine)
            : Helpers.actionOnSingleId(req.params.id, req.params.status, MODEL.Medicine);
        await action;
        const successMessage = ids
            ? `Selected record(s) ${req.params.status} successfully`
            : `Selected ${req.params.status} successfully`;
        return res.status(200).json(new ApiResponse(200, {}, successMessage));
    });
}

export const AdminMasterController = new Controller();
