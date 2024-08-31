import { Dependencies } from "../../packages/index.js";
import { asyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
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

        const query = await MODEL.Generic.find(filter).sort(sortOption).limit(limit).skip(skip);

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
    getGenericSelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Generic.find({ status: "active" });
        if (!result) {
            throw new ApiError(404, "Active record");
        }
        return res.status(200).json(new ApiResponse(200, { data: result }, "Get active generic"));
    });

    // description      Update Generic
    // route            PATCH /api/v1/admin/generic/:id
    // access           Private
    updateGeneric = asyncHandler(async (req, res) => {
        const genId = req.params.id;
        const { genericName, status } = req.body;

        if (!Dependencies.mongoose.isValidObjectId(genId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Generic.findById(genId);
        if (!exist) {
            throw new ApiError(400, "This Id is not exist in database");
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

        const query = await MODEL.Category.find(filter).sort(sortOption).limit(limit).skip(skip);

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

        const query = await MODEL.Brand.find(filter).sort(sortOption).limit(limit).skip(skip);
        const totalResults = await MODEL.Brand.find(filter).countDocuments();
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

        const brand = await MODEL.Brand.findById(brandId);
        if (!brand) {
            throw new ApiError(400, "Brand not found");
        }
        return res.status(200).json(new ApiResponse(200, brand, "All list of brand"));
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

        const query = await MODEL.Strength.find(filter).sort(sortOption).limit(limit).skip(skip);
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

        const query = await MODEL.Usage.find(filter).sort(sortOption).limit(limit).skip(skip);
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

        const newUser = req?.user;
        newUser.storeId.push(store._id);
        await newUser.save();

        return res.status(201).json(new ApiResponse(201, store, "Store created successfully"));
    });

    fetchStore = asyncHandler(async (req, res) => {
        const filter = {};
        const { search, status, sorting } = req.query;

        if (search) {
            filter.storeName = { $regex: search, $options: "i" };
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

        const query = await MODEL.Store.find(filter).sort(sortOption).limit(limit).skip(skip);
        const totalResults = await MODEL.Store.find(filter).countDocuments();
        const totalPages = Math.ceil(totalResults / limit);

        if (!query) {
            throw new ApiError(400, "Store is not found");
        }

        const pagination = {
            totalResult: totalResults,
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

    updateStore = asyncHandler(async (req, res) => {
        const storeId = req.params.id;
        const { storeName, phone, address, state, city, pin, personName, email, mobile } = req.body;

        if (!Dependencies.mongoose.isValidObjectId(storeId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const exist = await MODEL.Store.findById(storeId);
        if (!exist) {
            throw new ApiError(400, "This id is not exist in database");
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
}

export const AdminMasterController = new Controller();
