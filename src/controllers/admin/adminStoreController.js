import { Dependencies } from "../../packages/index.js";
import { asyncHandler, ApiResponse, ApiError, modifyResponse } from "../../utils/index.js";
import { Helpers, PAGINATION_LIMIT } from "../../common/index.js";
import { MODEL } from "../../models/index.js";

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

    /*------------ Store Inventory-------------*/

    addStoreInventory = asyncHandler(async (req, res) => {
        const { storeId, items } = req.body;

        if (!storeId) throw new ApiError(401, "All Fields are required");

        if (!items || items.length < 1) {
            throw new ApiError(401, "No cart items provided");
        }

        for (const item of items) {
            const dbMedicine = await MODEL.Medicine.findOne({ _id: item.medicineId });
            if (!dbMedicine) {
                throw new ApiError(401, `No medicine with id : ${item.medicineId}`);
            }
            if (item.quantity > dbMedicine.stock) {
                // if quantity is greater throw an error
                throw new ApiError(
                    400,
                    dbMedicine.stock > 0
                        ? "Only " +
                          dbMedicine.stock +
                          " Medicine are remaining. But you are adding " +
                          item.quantity
                        : "Medicine is out of stock"
                );
            }
            // Used this code for medicine stock quantity update
            dbMedicine.$inc("stock", -1 * item.quantity);
            await dbMedicine.save();
        }

        const total = items?.reduce((sum, item) => sum + item.totalPrice, 0);

        const newInventory = new MODEL.StoreInventory({
            storeId,
            items,
            totalAmount: total,
            status: "active",
            createdBy: req?.user?._id,
        });

        const savedInventory = await newInventory.save();

        return res
            .status(201)
            .json(new ApiResponse(201, savedInventory, "Store Inventory created successfully"));
    });

    fetchStoreInventory = asyncHandler(async (req, res) => {
        // const storeInventoryId = req.params.id;
        // const { search, status, sorting } = req.query;

        // let filter = {};
        // // if (search) {
        // //     filter.storeName = { $regex: search, $options: "i" };
        // // }

        // // Filter by categoryId
        // if (storeInventoryId) {
        //     filter.storeId = new Dependencies.mongoose.Types.ObjectId(storeInventoryId);
        // }

        // if (status) {
        //     filter.status = status;
        // }

        // // Sorting
        // let sortOption = {};
        // switch (sorting) {
        //     case "1":
        //         sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
        //         break;
        //     case "2":
        //         sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
        //         break;
        //     default:
        //         sortOption.createdAt = -1;
        //         break;
        // }

        // //Pagination
        // const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        // const skip = parseInt(req.query.page - 1) * limit;

        // const query = await MODEL.StoreInventory.find(filter, { ...modifyResponse, checked: 0 })
        //     .sort(sortOption)
        //     .limit(limit)
        //     .skip(skip)
        //     .populate("items.medicineId", "name -_id")
        //     .populate("createdBy", "fullName -_id");

        // // Total Items and Pages
        // const totalResult = await MODEL.StoreInventory.countDocuments(filter);
        // const totalPages = Math.ceil(totalResult / limit);

        // const pagination = {
        //     totalResult: totalResult,
        //     totalPages: totalPages,
        //     currentPage: parseInt(req.query.page),
        // };

        // return res
        //     .status(200)
        //     .json(
        //         new ApiResponse(200, { results: query, pagination }, "All list of store inventory")
        //     );

        const storeInventoryId = req.params.id;
        const { search, status, sorting } = req.query;

        let filter = {};

        // Filter by storeInventoryId
        if (storeInventoryId) {
            filter.storeId = new Dependencies.mongoose.Types.ObjectId(storeInventoryId);
        }

        if (status) {
            filter.status = status;
        }

        // Sorting
        let sortOption = {};
        switch (sorting) {
            case "1":
                sortOption.createdAt = -1; // Descending (latest first)
                break;
            case "2":
                sortOption.createdAt = 1; // Ascending (oldest first)
                break;
            default:
                sortOption.createdAt = -1;
                break;
        }

        // Pagination
        const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        const skip = (parseInt(req.query.page) - 1) * limit;

        // Aggregation query with group by orderData

        const pipeline = [
            { $match: filter },

            {
                $group: {
                    _id: "$storeId", // Group by storeId field
                    items: { $push: "$$ROOT" }, // Push all document data into items array
                    count: { $sum: 1 }, // Count the number of items per group
                },
            },

            { $unwind: "$items" },

            { $sort: sortOption },
            //{ $skip: skip },
            { $limit: limit },

            {
                $lookup: {
                    from: "medicine", // The medicine collection
                    localField: "items.medicineId",
                    foreignField: "_id",
                    as: "medicineDetails", // Populating medicine details
                },
            },

            {
                $lookup: {
                    from: "users", // The users collection
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "creatorDetails", // Populating creator details
                },
            },
        ];

        //Query
        const query = await MODEL.StoreInventory.aggregate(pipeline);

        // Total Items and Pages
        const totalResult = await MODEL.StoreInventory.countDocuments(filter);
        const totalPages = Math.ceil(totalResult / limit);

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
                    "All list of store inventory grouped by orderData"
                )
            );
    });

    fetchStoreInventoryById = asyncHandler(async (req, res) => {
        const storeInventoryId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(storeInventoryId)) {
            throw new ApiError(400, "This is not valid id");
        }

        const storeInventory = await MODEL.StoreInventory.findById(storeInventoryId);
        if (!storeInventory) {
            throw new ApiError(400, "Store Inventory not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, storeInventory, "Get Store Inventory Records"));
    });

    /*------------ Store Cart -----------------*/

    addStoreCart = asyncHandler(async (req, res) => {
        const { storeId, medicineId, quantity } = req.body;
        //const cart = await MODEL.StoreCart.findOne({ createdBy: req?.user?._id });
        let cart = await MODEL.StoreCart.findOne({ storeId: storeId, createdBy: req?.user?._id });

        if (cart) {
            // If cart exists for user, update it
            const itemIndex = cart.items.findIndex(
                (item) => item.medicineId.toString() === medicineId
            );
            if (itemIndex !== -1) {
                // Medicine exists in cart, update the quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Medicine does not exist in cart, add new item
                cart.items.push({ medicineId: medicineId, quantity });
            }
            await cart.save();
            res.status(200).json(cart);
        } else {
            // If no cart exists for user, create a new cart
            const newCart = await MODEL.StoreCart.create({
                storeId: storeId,
                items: [{ medicineId: medicineId, quantity }],
                createdBy: req?.user?._id,
            });
            res.status(201).json(newCart);
        }
    });
}

export const AdminStoreController = new Controller();
