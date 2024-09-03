import { Dependencies } from "../../packages/index.js";
import { asyncHandler, ApiResponse, ApiError, modifyResponse } from "../../utils/index.js";
import { Helpers, PAGINATION_LIMIT } from "../../common/index.js";
import { MODEL } from "../../models/index.js";

class Controller {
    /*-------------Medicine Controller --------------*/

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

export const AdminMedicineController = new Controller();
