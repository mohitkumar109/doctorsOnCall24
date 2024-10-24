import { Dependencies } from "../../packages/index.js";
import { asyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
import { Helpers, PAGINATION_LIMIT } from "../../common/index.js";
import { AdminMasterQueryBuilder } from "../../entity/adminEntity.js";
import { MODEL } from "../../models/index.js";

const addStockLogs = async (medicineId, quantity, storeId, createdBy) => {
    try {
        // Find the medicine
        const medicine = await MODEL.Medicine.findById(medicineId);
        if (!medicine) {
            throw new ApiError(404, `Medicine not found: ${medicineId}`);
        }

        const stockBefore = medicine.stock;
        const stockAfter = stockBefore - quantity;

        // Update the medicine stock
        medicine.stock = stockAfter;
        await medicine.save();

        // Create an inventory log
        const inventoryLog = new MODEL.MedicineInvtLog({
            storeId,
            medicine: medicine._id,
            quantity_before: stockBefore,
            quantity_after: stockAfter,
            action_type: "SALE", //Log action as an addition
            createdBy,
        });
        await inventoryLog.save();
    } catch (err) {
        throw new ApiError(500, `Error adding stock: ${err.message}`);
    }
};

class Controller {
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
        if (alreadyExist) throw new ApiError(400, "Store name already exist in records");

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
        let queryData = AdminMasterQueryBuilder.storeList(req.query);
        const query = await Helpers.aggregation(queryData, MODEL.Store);
        // Total Items and Pages
        const totalResult = await Helpers.getDataLength(query, MODEL.Store);
        const totalPages = Math.ceil(totalResult / parseInt(req.query.limit || PAGINATION_LIMIT));

        if (!query) throw new ApiError(400, "Store is not found");

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
        if (!Dependencies.mongoose.isValidObjectId(storeId))
            throw new ApiError(400, "This is not valid id");

        const store = await MODEL.Store.findById(storeId);
        if (!store) throw new ApiError(400, "Store not found");

        return res.status(200).json(new ApiResponse(200, store, "Get store"));
    });

    fetchSelect = asyncHandler(async (req, res) => {
        const result = await MODEL.Store.find({ status: "active" }, { storeName: 1 });
        if (!result) throw new ApiError(404, "Active record not found");

        return res.status(200).json(new ApiResponse(200, { data: result }, "Get active store"));
    });

    updateStore = asyncHandler(async (req, res) => {
        const storeId = req.params.id;
        const { storeName, phone, address, state, city, pin, personName, email, mobile, status } =
            req.body;

        if (!Dependencies.mongoose.isValidObjectId(storeId))
            throw new ApiError(400, "This is not valid id");

        const exist = await MODEL.Store.findById(storeId);
        if (!exist) throw new ApiError(400, "This id is not exist in database");

        // Check if another record with the same storeName exists (excluding the current record)
        const duplicate = await MODEL.Store.findOne({ storeName, _id: { $ne: storeId } });
        if (duplicate) throw new ApiError(400, "Store name already exists");

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

    /*------------ Medicine Order to Store-------------*/

    createStoreOrder = asyncHandler(async (req, res) => {
        const { storeId, items } = req.body;

        if (!storeId) throw new ApiError(401, "All Fields are required");
        if (!items || items.length < 1) throw new ApiError(401, "No cart items provided");

        let totalAmount = 0;
        let orderNumber = Helpers.createOrderNumber("ORDS");

        // Loop through each item in the cart
        for (const item of items) {
            const dbMedicine = await MODEL.Medicine.findOne({ _id: item.medicine });

            // Check if the medicine exists
            if (!dbMedicine) throw new ApiError(401, `No medicine with id: ${item.medicine}`);

            // Check if the requested quantity is available in stock
            if (item.quantity > dbMedicine.stock) {
                throw new ApiError(
                    400,
                    dbMedicine.stock > 0
                        ? `Only ${dbMedicine.stock} units are available. You're trying to add ${item.quantity}.`
                        : "Medicine is out of stock."
                );
            }

            // Use a fixed price of per unit
            totalAmount += item.quantity * dbMedicine.price;
            await addStockLogs(item.medicine, item.quantity, storeId, req?.user?._id);

            const checkExists = await MODEL.StoreMedicine.findOne({
                storeId: storeId,
                medicineId: item.medicine,
            });

            if (!checkExists) {
                const addStoreMedicine = new MODEL.StoreMedicine({
                    storeId,
                    medicineId: item.medicine,
                    quantity: item.quantity,
                    createdBy: req?.user?._id,
                });
                await addStoreMedicine.save();
            } else {
                checkExists.quantity += item.quantity;
                await checkExists.save();
            }
        }

        // Create a new store inventory entry with the calculated total amount
        const newOrder = new MODEL.MedicineOrder({
            orderId: orderNumber,
            storeId,
            orderPrice: totalAmount,
            items,
            status: "pending",
            createdBy: req?.user?._id,
        });

        const savedOrder = await newOrder.save();

        // Send success response
        return res
            .status(201)
            .json(new ApiResponse(201, savedOrder, "Medicine order created successfully"));
    });

    fetchStoreOrder = asyncHandler(async (req, res) => {
        let queryData = AdminMasterQueryBuilder.storeOrder(req.query);
        const query = await Helpers.aggregation(queryData, MODEL.MedicineOrder);

        // Total Items and Pages
        const totalResult = await Helpers.getDataLength(query, MODEL.MedicineOrder);
        const totalPages = Math.ceil(totalResult / parseInt(req.query.limit || PAGINATION_LIMIT));

        if (!query) {
            throw new ApiError(400, "Store order is not found");
        }
        const pagination = {
            totalResult: totalResult,
            totalPages: totalPages,
            currentPage: parseInt(req.query.page),
        };
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results: query, pagination },
                    "Get medicine store order records"
                )
            );
    });

    fetchStoreOrderItems = asyncHandler(async (req, res) => {
        let queryData = AdminMasterQueryBuilder.storeOrderItems(req.query);
        const query = await Helpers.aggregation(queryData, MODEL.MedicineOrder);

        if (!query) throw new ApiError(400, "Store medicine items is not found");

        return res
            .status(200)
            .json(new ApiResponse(200, { results: query }, "Fetch store order items"));
    });

    fetchStoreMedicine = asyncHandler(async (req, res) => {
        // Build the query with the storeId and other parameters
        const storeId = req.query.storeId
            ? new Dependencies.mongoose.Types.ObjectId(req.query.storeId)
            : null;

        // Count documents using storeId (and other simple filters if needed)
        const totalResult = await MODEL.StoreMedicine.countDocuments({ storeId });

        // Calculate total number of pages based on count and limit
        const totalPages = Math.ceil(totalResult / parseInt(req.query.limit || PAGINATION_LIMIT));

        // Build the aggregation pipeline for fetching paginated results
        let queryData = AdminMasterQueryBuilder.storeMedicine(req.query);

        // Fetch paginated results using the aggregation pipeline
        const query = await Helpers.aggregation(queryData, MODEL.StoreMedicine);

        if (!query) {
            throw new ApiError(400, "Store Medicine is not found");
        }
        const pagination = {
            totalResult: totalResult,
            totalPages: totalPages,
            currentPage: parseInt(req.query.page),
        };

        return res
            .status(200)
            .json(
                new ApiResponse(200, { results: query, pagination }, "Get Store Medicine Records")
            );
    });
}

export const AdminStoreController = new Controller();
