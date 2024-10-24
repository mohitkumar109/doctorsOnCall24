import { Dependencies } from "../../packages/index.js";
import { asyncHandler, ApiResponse, ApiError, modifyResponse } from "../../utils/index.js";
import { AdminMasterQueryBuilder } from "../../entity/adminEntity.js";
import { Helpers, PAGINATION_LIMIT } from "../../common/index.js";
import { MODEL } from "../../models/index.js";

const addStock = async (medicineId, quantity, createdBy) => {
    try {
        // Find the medicine
        const medicine = await MODEL.Medicine.findById(medicineId);
        if (!medicine) throw new ApiError(404, `Medicine not found: ${medicineId}`);

        const quantityBefore = medicine.stock;
        const quantityAfter = quantityBefore + quantity;

        // Update the medicine stock
        medicine.stock = quantityAfter;
        await medicine.save();

        // Create an inventory log
        const inventoryLog = new MODEL.MedicineInvtLog({
            medicine: medicine._id,
            quantity_before: quantityBefore,
            quantity_after: quantityAfter,
            action_type: "ADD", // Log action as an addition
            createdBy,
        });
        await inventoryLog.save();

        console.log("Stock added and inventory log created:", inventoryLog);
    } catch (err) {
        throw new ApiError(500, `Error adding stock: ${err.message}`);
    }
};

const updateStock = async (medicineId, quantityChange, createdBy) => {
    try {
        // Find the medicine
        const medicine = await MODEL.Medicine.findById(medicineId);
        if (!medicine) throw new ApiError(404, `Medicine not found: ${medicineId}`);

        const quantityBefore = medicine.stock;
        const quantityAfter = quantityBefore + quantityChange;

        // Ensure stock does not go below zero
        if (quantityAfter < 0) throw new ApiError(400, "Stock cannot be negative");

        // Update the medicine stock
        medicine.stock = quantityAfter;
        await medicine.save();

        // Create an inventory log
        const inventoryLog = new MODEL.MedicineInvtLog({
            medicine: medicine._id,
            quantity_before: quantityBefore,
            quantity_after: quantityAfter,
            action_type: quantityChange > 0 ? "ADD" : "REMOVE", // Log as 'ADD' or 'REMOVE'
            createdBy,
        });
        await inventoryLog.save();
    } catch (err) {
        throw new ApiError(500, `Error updating stock: ${err.message}`);
    }
};

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
        )
            throw new ApiError(404, "All Fields are required for medicine");

        const alreadyExist = await MODEL.Medicine.findOne({ name });
        if (alreadyExist) throw new ApiError(400, "Medicine already exist in records");

        const medicine = await MODEL.Medicine({
            name,
            genericId,
            categoryId,
            brandId,
            strengthId,
            usageId,
            stock: 0,
            price,
            unitType,
            expireDate,
            status: status || "active",
            createdBy: req?.user?._id,
        });

        await medicine.save();

        // If medicine is created successfully, add the stock and log it
        if (medicine) {
            await addStock(medicine._id, stock, req?.user?._id);
        }

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
        if (!query) throw new ApiError(400, "Medicine is not found");

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
        if (!Dependencies.mongoose.isValidObjectId(medicineId))
            throw new ApiError(400, "This is not valid id");

        const medicine = await MODEL.Medicine.findById(medicineId, {
            ...modifyResponse,
        });

        if (!medicine) throw new ApiError(400, "medicine not found");

        return res.status(200).json(new ApiResponse(200, medicine, "Get medicine"));
    });

    fetchMedicineSelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Medicine.find({ status: "active" }, { name: 1 });
        if (!result) throw new ApiError(404, "Active record not found");

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

        if (!Dependencies.mongoose.isValidObjectId(medicineId))
            throw new ApiError(400, "This is not valid id");

        const exist = await MODEL.Medicine.findById(medicineId);
        if (!exist) throw new ApiError(400, "This id is not exist in database");

        // Check if another record with the same Medicine Name exists (excluding the current record)
        const duplicate = await MODEL.Medicine.findOne({
            name,
            _id: { $ne: medicineId },
        });
        if (duplicate) throw new ApiError(400, "Medicine already exist in records!");

        // Check if the stock is being updated
        if (stock !== undefined && stock !== exist.stock) {
            const stockDifference = stock - exist.stock;
            // Use addStock function to log and update the stock
            await updateStock(medicineId, stockDifference, req?.user?._id);
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

    fetchMedicineStatistics = asyncHandler(async (req, res) => {
        const logs = await MODEL.MedicineInvtLog.find({}).populate("medicine");

        // Object to store statistics
        const medicineStats = {};

        // Loop through all logs
        logs.forEach((log) => {
            const medicineName = log?.medicine?.name; // Get medicine name (assuming medicine is populated)
            const quantityChange = log?.quantity_after - log?.quantity_before;
            const currentStock = log?.medicine?.stock;

            // Initialize medicine entry in stats if not present
            if (!medicineStats[medicineName]) {
                medicineStats[medicineName] = {
                    medicineName: medicineName,
                    totalSales: 0,
                    totalAdditions: 0,
                    totalSubtraction: 0,
                    currentStock: currentStock,
                };
            }

            if (log.action_type === "SALE") {
                medicineStats[medicineName].totalSales += Math.abs(quantityChange); // Add to total sales
            } else if (log.action_type === "ADD") {
                medicineStats[medicineName].totalAdditions += quantityChange; // Add to total additions
            } else if (log.action_type === "REMOVE") {
                medicineStats[medicineName].totalSubtraction += Math.abs(quantityChange);
            }

            // Update current stock in case it changes for every log
            medicineStats[medicineName].currentStock = currentStock;
        });

        // Convert medicineStats object to array
        const statsArray = Object.values(medicineStats);

        return res
            .status(200)
            .json(new ApiResponse(200, { results: statsArray }, "Total sale and additions"));
    });
}

export const AdminMedicineController = new Controller();
