import { Dependencies } from "../../packages/index.js";
import { asyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
import { Helpers, PAGINATION_LIMIT } from "../../common/index.js";
import { MODEL } from "../../models/index.js";
import { AdminMasterQueryBuilder } from "../../entity/admin.master.entity.js";

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
        let queryData = AdminMasterQueryBuilder.storeList(req.query);
        const query = await Helpers.aggregation(queryData, MODEL.Store);
        // Total Items and Pages
        const totalResult = await Helpers.getDataLength(query, MODEL.Store);
        const totalPages = Math.ceil(totalResult / parseInt(req.query.limit || PAGINATION_LIMIT));

        if (!query) {
            throw new ApiError(400, "Store is not found");
        }
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

    // addStoreInventory = asyncHandler(async (req, res) => {
    //     const { storeId, items } = req.body;

    //     if (!storeId) throw new ApiError(401, "All Fields are required");

    //     if (!items || items.length < 1) {
    //         throw new ApiError(401, "No cart items provided");
    //     }

    //     for (const item of items) {
    //         const dbMedicine = await MODEL.Medicine.findOne({ _id: item.medicineId });
    //         if (!dbMedicine) {
    //             throw new ApiError(401, `No medicine with id : ${item.medicineId}`);
    //         }
    //         if (item.quantity > dbMedicine.stock) {
    //             // if quantity is greater throw an error
    //             throw new ApiError(
    //                 400,
    //                 dbMedicine.stock > 0
    //                     ? "Only " +
    //                       dbMedicine.stock +
    //                       " Medicine are remaining. But you are adding " +
    //                       item.quantity
    //                     : "Medicine is out of stock"
    //             );
    //         }
    //         // Used this code for medicine stock quantity update
    //         dbMedicine.$inc("stock", -1 * item.quantity);
    //         await dbMedicine.save();
    //     }

    //     const totalAmount = items?.reduce((sum, item) => sum + item.quantity * item.price, 0);

    //     const newInventory = new MODEL.StoreInventory({
    //         storeId,
    //         items,
    //         orderPrice: totalAmount,
    //         status: "pending",
    //         createdBy: req?.user?._id,
    //     });

    //     const savedInventory = await newInventory.save();

    //     return res
    //         .status(201)
    //         .json(new ApiResponse(201, savedInventory, "Store Inventory created successfully"));
    // });

    addStoreInventory = asyncHandler(async (req, res) => {
        const { storeId, items } = req.body;

        if (!storeId) {
            throw new ApiError(401, "All Fields are required");
        }

        if (!items || items.length < 1) {
            throw new ApiError(401, "No cart items provided");
        }

        let totalAmount = 0;

        // Loop through each item in the cart
        for (const item of items) {
            const dbMedicine = await MODEL.Medicine.findOne({ _id: item.medicineId });

            // Check if the medicine exists
            if (!dbMedicine) {
                throw new ApiError(401, `No medicine with id: ${item.medicineId}`);
            }

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

            // Atomically update the stock quantity in the database
            await MODEL.Medicine.updateOne(
                { _id: item.medicineId },
                { $inc: { stock: -item.quantity } }
            );

            // Now add the reference to the store's medicine array if not already present
            const store = await MODEL.Store.findById(storeId);
            store.medicine.push(item.medicineId); // Add the new inventory reference
            // Save the updated store
            await store.save();
        }

        // Create a new store inventory entry with the calculated total amount
        const newInventory = new MODEL.StoreInventory({
            storeId,
            items,
            orderPrice: totalAmount, // Total price calculated using fixed price of 10 per unit
            status: "pending", // Set initial status as pending
            createdBy: req?.user?._id, // Store the ID of the user who created the inventory
        });

        // Save the new inventory record to the database
        const savedInventory = await newInventory.save();

        // Send success response
        return res
            .status(201)
            .json(new ApiResponse(201, savedInventory, "Store Inventory created successfully"));
    });

    fetchStoreInventoryById = asyncHandler(async (req, res) => {
        //let queryData = AdminMasterQueryBuilder.storeCart(storeInventoryId);
        //const query = await Helpers.aggregation(queryData, MODEL.StoreInventory);

        // const query = await MODEL.StoreInventory.find({ storeId: storeInventoryId })
        //     .populate("items.medicineId", "name price -_id")
        //     .populate("createdBy", "fullName -_id");

        // if (!query) {
        //     throw new ApiError(400, "Store is not found");
        // }
        // return res.status(200).json(new ApiResponse(200, query, "Get Store Inventory Records"));

        const storeInventoryId = req.params.id;
        if (!Dependencies.mongoose.isValidObjectId(storeInventoryId)) {
            throw new ApiError(400, "This is not valid id");
        }
        const { search, status, sorting } = req.query;

        let filter = {};
        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        // Filter by categoryId
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
                sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest first)
                break;
            case "2":
                sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest first)
                break;
            default:
                sortOption.createdAt = -1;
                break;
        }

        //Pagination
        const limit = parseInt(req.query.limit) || PAGINATION_LIMIT;
        const skip = parseInt(req.query.page - 1) * limit;

        const query = await MODEL.StoreInventory.find(filter)
            .sort(sortOption)
            .limit(limit)
            .skip(skip)
            .populate("items.medicineId", "name price -_id")
            .populate("createdBy", "fullName -_id");

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
                new ApiResponse(200, { results: query, pagination }, "All list of store inventory")
            );
    });

    /*------------ Store Cart -----------------*/

    addStoreCart = asyncHandler(async (req, res) => {
        const { storeId, medicineId, quantity } = req.body;

        // See if product that user is adding exist in the db
        const medicine = await MODEL.Medicine.findById(medicineId);
        if (!medicine) {
            throw new ApiError(404, "Medicine does not exits");
        }

        // If product is there check if the quantity that user is adding is less than or equal to the product's stock
        if (quantity > medicine.stock) {
            // if quantity is greater throw an error
            throw new ApiError(
                400,
                medicine.stock > 0
                    ? "Only " +
                      medicine.stock +
                      "medicines are remaining. But you are adding " +
                      quantity
                    : "medicine is out of stock"
            );
        }

        //const cart = await MODEL.StoreCart.findOne({ createdBy: req?.user?._id });
        const cart = await MODEL.StoreCart.findOne({
            storeId: storeId,
            createdBy: req?.user?._id,
        });

        if (cart) {
            // If cart exists for user, update it
            const itemIndex = cart?.items?.findIndex(
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
            return res
                .status(201)
                .json(new ApiResponse(201, cart, "Add To Cart medicine successfully"));
        } else {
            // If no cart exists for user, create a new cart
            const newCart = await MODEL.StoreCart.create({
                storeId: storeId,
                items: [{ medicineId: medicineId, quantity }],
                createdBy: req?.user?._id,
            });
            return res
                .status(201)
                .json(new ApiResponse(201, newCart, "Add To Cart medicine successfully"));
        }
    });

    fetchStoreCart = asyncHandler(async (req, res) => {
        let queryData = AdminMasterQueryBuilder.storeCart(req.body);
        const query = await Helpers.aggregation(queryData, MODEL.StoreCart);
        if (!query) {
            throw new ApiError(400, "Store Cart is not found");
        }
        return res.status(200).json(new ApiResponse(200, query, "Store Cart Medicine"));
    });

    fetchStoreMedicine = asyncHandler(async (req, res) => {
        const query = await MODEL.Store.find({}).populate("medicine", "name");

        return res.status(200).json(new ApiResponse(200, { results: query }, "All store Medicine"));
    });
}

export const AdminStoreController = new Controller();
