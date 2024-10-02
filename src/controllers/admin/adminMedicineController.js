import { Dependencies } from "../../packages/index.js";
import { asyncHandler, ApiResponse, ApiError, modifyResponse } from "../../utils/index.js";
import { AdminMasterQueryBuilder } from "../../entity/admin.master.entity.js";
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
            unitType,
            usageId,
            stock,
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
            !unitType ||
            !usageId ||
            !stock ||
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
            stock,
            price,
            unitType,
            expireDate,
            status: status || "active",
            createdBy: req?.user?._id,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, medicine, "Medicine created successfully!"));
    });

    fetchMedicine = asyncHandler(async (req, res) => {
        let queryData = AdminMasterQueryBuilder.medicineList(req.query);
        const query = await Helpers.aggregation(queryData, MODEL.Medicine);
        // Total Items and Pages
        const totalResult = await MODEL.Medicine.countDocuments(queryData);
        const totalPages = Math.ceil(totalResult / parseInt(req.query.limit || PAGINATION_LIMIT));
        if (!query) {
            throw new ApiError(400, "Medicine is not found");
        }
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
            stock,
            price,
            unitType,
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
                    stock,
                    price,
                    unitType,
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
