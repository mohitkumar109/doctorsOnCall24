import { Dependencies } from "../packages/index.js";
import { PAGINATION_LIMIT } from "../common/constants.js";

export const AdminMasterQueryBuilder = {
    genericList: (data) => {
        let query = [];
        let match = {};

        if (data.search) {
            match["genericName"] = { $regex: data.search, $options: "i" };
        }

        if (data.status) {
            match["status"] = data.status;
        }

        query.push({
            $match: match,
        });

        switch (data.sorting) {
            case "1":
                query.push({
                    $sort: { createdAt: -1 }, // Sort by createdAt in descending order
                });
                break;
            case "2":
                query.push({
                    $sort: { createdAt: 1 }, // Sort by createdAt in ascending order
                });
                break;
            case "3":
                query.push({
                    $sort: { genericName: -1 }, // Sort by name in descending order
                });
                break;
            case "4":
                query.push({
                    $sort: { genericName: 1 }, // Sort by name in ascending order
                });
                break;
            default:
                query.push({
                    $sort: { createdAt: -1 }, // Default sorting by createdAt in descending order
                });
                break;
        }

        query.push({
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdByUser",
            },
        });

        query.push({
            $lookup: {
                from: "users",
                localField: "updatedBy",
                foreignField: "_id",
                as: "updatedByUser",
            },
        });

        query.push({
            $addFields: {
                createdBy: { $arrayElemAt: ["$createdByUser.fullName", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser.fullName", 0] },
            },
        });

        query.push({
            $project: {
                genericName: 1,
                status: 1,
                createdBy: 1,
                updatedBy: 1,
                updatedAt: 1,
                createdAt: 1,
            },
        });

        query.push({
            $skip: data.limit
                ? (parseInt(data.page) - 1) * parseInt(data.limit)
                : (parseInt(data.page) - 1) * PAGINATION_LIMIT,
        });

        query.push({
            $limit: data.limit ? parseInt(data.limit) : PAGINATION_LIMIT,
        });

        return query;
    },

    categoryList: (data) => {
        let query = [];
        let match = {};

        if (data.status) {
            match["status"] = data.status;
        }

        if (data.search) {
            match["categoryName"] = { $regex: data.search, $options: "i" };
        }

        query.push({
            $match: match,
        });

        switch (data.sorting) {
            case "1":
                query.push({
                    $sort: { createdAt: -1 }, // Sort by createdAt in descending order
                });
                break;
            case "2":
                query.push({
                    $sort: { createdAt: 1 }, // Sort by createdAt in ascending order
                });
                break;
            case "3":
                query.push({
                    $sort: { categoryName: -1 }, // Sort by name in descending order
                });
                break;
            case "4":
                query.push({
                    $sort: { categoryName: 1 }, // Sort by name in ascending order
                });
                break;
            default:
                query.push({
                    $sort: { createdAt: -1 }, // Default sorting by createdAt in descending order
                });
                break;
        }

        query.push({
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdByUser",
            },
        });

        query.push({
            $lookup: {
                from: "users",
                localField: "updatedBy",
                foreignField: "_id",
                as: "updatedByUser",
            },
        });

        query.push({
            $addFields: {
                createdBy: { $arrayElemAt: ["$createdByUser.fullName", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser.fullName", 0] },
            },
        });

        query.push({
            $project: {
                categoryName: 1,
                status: 1,
                createdBy: 1,
                updatedBy: 1,
                updatedAt: 1,
                createdAt: 1,
            },
        });

        query.push({
            $skip: data.limit
                ? (parseInt(data.page) - 1) * parseInt(data.limit)
                : (parseInt(data.page) - 1) * PAGINATION_LIMIT,
        });

        query.push({
            $limit: data.limit ? parseInt(data.limit) : PAGINATION_LIMIT,
        });

        return query;
    },

    brandList: (data) => {
        let query = [];
        let match = {};

        if (data.status) {
            match["status"] = data.status;
        }

        if (data.search) {
            match["brandName"] = { $regex: data.search, $options: "i" };
        }

        query.push({
            $match: match,
        });

        switch (data.sorting) {
            case "1":
                query.push({
                    $sort: { createdAt: -1 }, // Sort by createdAt in descending order
                });
                break;
            case "2":
                query.push({
                    $sort: { createdAt: 1 }, // Sort by createdAt in ascending order
                });
                break;
            case "3":
                query.push({
                    $sort: { brandName: -1 }, // Sort by name in descending order
                });
                break;
            case "4":
                query.push({
                    $sort: { brandName: 1 }, // Sort by name in ascending order
                });
                break;
            default:
                query.push({
                    $sort: { createdAt: -1 }, // Default sorting by createdAt in descending order
                });
                break;
        }

        query.push({
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdByUser",
            },
        });

        query.push({
            $lookup: {
                from: "users",
                localField: "updatedBy",
                foreignField: "_id",
                as: "updatedByUser",
            },
        });

        query.push({
            $addFields: {
                createdBy: { $arrayElemAt: ["$createdByUser.fullName", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser.fullName", 0] },
            },
        });

        query.push({
            $project: {
                brandName: 1,
                status: 1,
                createdBy: 1,
                updatedBy: 1,
                updatedAt: 1,
                createdAt: 1,
            },
        });

        query.push({
            $skip: data.limit
                ? (parseInt(data.page) - 1) * parseInt(data.limit)
                : (parseInt(data.page) - 1) * PAGINATION_LIMIT,
        });

        query.push({
            $limit: data.limit ? parseInt(data.limit) : PAGINATION_LIMIT,
        });

        return query;
    },

    strengthList: (data) => {
        let query = [];
        let match = {};

        if (data.status) {
            match["status"] = data.status;
        }

        if (data.search) {
            match["strengthName"] = { $regex: data.search, $options: "i" };
        }

        query.push({
            $match: match,
        });

        switch (data.sorting) {
            case "1":
                query.push({
                    $sort: { createdAt: -1 }, // Sort by createdAt in descending order
                });
                break;
            case "2":
                query.push({
                    $sort: { createdAt: 1 }, // Sort by createdAt in ascending order
                });
                break;
            case "3":
                query.push({
                    $sort: { strengthName: -1 }, // Sort by name in descending order
                });
                break;
            case "4":
                query.push({
                    $sort: { strengthName: 1 }, // Sort by name in ascending order
                });
                break;
            default:
                query.push({
                    $sort: { createdAt: -1 }, // Default sorting by createdAt in descending order
                });
                break;
        }

        query.push({
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdByUser",
            },
        });

        query.push({
            $lookup: {
                from: "users",
                localField: "updatedBy",
                foreignField: "_id",
                as: "updatedByUser",
            },
        });

        query.push({
            $addFields: {
                createdBy: { $arrayElemAt: ["$createdByUser.fullName", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser.fullName", 0] },
            },
        });

        query.push({
            $project: {
                strengthName: 1,
                status: 1,
                createdBy: 1,
                updatedBy: 1,
                updatedAt: 1,
                createdAt: 1,
            },
        });

        query.push({
            $skip: data.limit
                ? (parseInt(data.page) - 1) * parseInt(data.limit)
                : (parseInt(data.page) - 1) * PAGINATION_LIMIT,
        });

        query.push({
            $limit: data.limit ? parseInt(data.limit) : PAGINATION_LIMIT,
        });

        return query;
    },

    usageList: (data) => {
        let query = [];
        let match = {};

        if (data.status) {
            match["status"] = data.status;
        }

        if (data.search) {
            match["usageName"] = { $regex: data.search, $options: "i" };
        }

        query.push({
            $match: match,
        });

        switch (data.sorting) {
            case "1":
                query.push({
                    $sort: { createdAt: -1 }, // Sort by createdAt in descending order
                });
                break;
            case "2":
                query.push({
                    $sort: { createdAt: 1 }, // Sort by createdAt in ascending order
                });
                break;
            case "3":
                query.push({
                    $sort: { usageName: -1 }, // Sort by name in descending order
                });
                break;
            case "4":
                query.push({
                    $sort: { usageName: 1 }, // Sort by name in ascending order
                });
                break;
            default:
                query.push({
                    $sort: { createdAt: -1 }, // Default sorting by createdAt in descending order
                });
                break;
        }

        query.push({
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdByUser",
            },
        });

        query.push({
            $lookup: {
                from: "users",
                localField: "updatedBy",
                foreignField: "_id",
                as: "updatedByUser",
            },
        });

        query.push({
            $addFields: {
                createdBy: { $arrayElemAt: ["$createdByUser.fullName", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser.fullName", 0] },
            },
        });

        query.push({
            $project: {
                usageName: 1,
                status: 1,
                createdBy: 1,
                updatedBy: 1,
                updatedAt: 1,
                createdAt: 1,
            },
        });

        query.push({
            $skip: data.limit
                ? (parseInt(data.page) - 1) * parseInt(data.limit)
                : (parseInt(data.page) - 1) * PAGINATION_LIMIT,
        });

        query.push({
            $limit: data.limit ? parseInt(data.limit) : PAGINATION_LIMIT,
        });

        return query;
    },

    storeList: (data) => {
        let query = [];
        let match = {};

        if (data.search) {
            match["storeName"] = { $regex: data.search, $options: "i" };
        }

        if (data.status) {
            match["status"] = data.status;
        }

        query.push({
            $match: match,
        });

        switch (data.sorting) {
            case "1":
                query.push({
                    $sort: { createdAt: -1 }, // Sort by createdAt in descending order
                });
                break;
            case "2":
                query.push({
                    $sort: { createdAt: 1 }, // Sort by createdAt in ascending order
                });
                break;
            case "3":
                query.push({
                    $sort: { storeName: -1 }, // Sort by name in descending order
                });
                break;
            case "4":
                query.push({
                    $sort: { storeName: 1 }, // Sort by name in ascending order
                });
                break;
            default:
                query.push({
                    $sort: { createdAt: -1 }, // Default sorting by createdAt in descending order
                });
                break;
        }

        query.push({
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdByUser",
            },
        });

        query.push({
            $lookup: {
                from: "users",
                localField: "updatedBy",
                foreignField: "_id",
                as: "updatedByUser",
            },
        });

        query.push({
            $addFields: {
                createdBy: { $arrayElemAt: ["$createdByUser.fullName", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser.fullName", 0] },
            },
        });

        query.push({
            $project: {
                storeName: 1,
                status: 1,
                createdAt: 1,
                "location.address": 1,
                "location.phone": 1,
                "contactPerson.email": 1,
                createdBy: 1,
                updatedBy: 1,
            },
        });

        query.push({
            $skip: data.limit
                ? (parseInt(data.page) - 1) * parseInt(data.limit)
                : (parseInt(data.page) - 1) * PAGINATION_LIMIT,
        });

        query.push({
            $limit: data.limit ? parseInt(data.limit) : PAGINATION_LIMIT,
        });

        return query;
    },

    medicineList: (data) => {
        let query = [];
        let match = {};

        if (data.search) {
            match["name"] = { $regex: data.search, $options: "i" };
        }

        if (data.status) {
            match["status"] = data.status;
        }

        // Filter by genericId
        if (data.generic) {
            match["genericId"] = new Dependencies.mongoose.Types.ObjectId(data?.generic);
        }

        // Filter by categoryId
        if (data.category) {
            match["categoryId"] = new Dependencies.mongoose.Types.ObjectId(data?.category);
        }

        // Filter by brandId
        if (data.brand) {
            match["brandId"] = new Dependencies.mongoose.Types.ObjectId(data?.brand);
        }

        query.push({
            $match: match,
        });

        switch (data.sorting) {
            case "1":
                query.push({
                    $sort: { createdAt: -1 }, // Sort by createdAt in descending order
                });
                break;
            case "2":
                query.push({
                    $sort: { createdAt: 1 }, // Sort by createdAt in ascending order
                });
                break;
            case "3":
                query.push({
                    $sort: { name: -1 }, // Sort by name in descending order
                });
                break;
            case "4":
                query.push({
                    $sort: { name: 1 }, // Sort by name in ascending order
                });
                break;
            default:
                query.push({
                    $sort: { createdAt: -1 }, // Default sorting by createdAt in descending order
                });
                break;
        }

        query.push({
            $lookup: {
                from: "generics",
                localField: "genericId",
                foreignField: "_id",
                as: "generic",
            },
        });

        query.push({
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
            },
        });

        query.push({
            $lookup: {
                from: "brands",
                localField: "brandId",
                foreignField: "_id",
                as: "brand",
            },
        });

        query.push({
            $lookup: {
                from: "strengths",
                localField: "strengthId",
                foreignField: "_id",
                as: "strength",
            },
        });

        query.push({
            $lookup: {
                from: "usages",
                localField: "usageId",
                foreignField: "_id",
                as: "usage",
            },
        });

        query.push({
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdByUser",
            },
        });

        query.push({
            $lookup: {
                from: "users",
                localField: "updatedBy",
                foreignField: "_id",
                as: "updatedByUser",
            },
        });

        query.push({
            $addFields: {
                generic: { $arrayElemAt: ["$generic.genericName", 0] },
                category: { $arrayElemAt: ["$category.categoryName", 0] },
                brand: { $arrayElemAt: ["$brand.brandName", 0] },
                strength: { $arrayElemAt: ["$strength.strengthName", 0] },
                usage: { $arrayElemAt: ["$usage.usageName", 0] },
                createdBy: { $arrayElemAt: ["$createdByUser.fullName", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser.fullName", 0] },
            },
        });

        query.push({
            $project: {
                name: 1,
                stock: 1,
                price: 1,
                unitType: 1,
                expireDate: 1,
                status: 1,
                createdAt: 1,
                generic: 1,
                category: 1,
                brand: 1,
                strength: 1,
                usage: 1,
                createdBy: 1,
                updatedBy: 1,
                updatedAt: 1,
                createdAt: 1,
            },
        });

        query.push({
            $skip: data.limit
                ? (parseInt(data.page) - 1) * parseInt(data.limit)
                : (parseInt(data.page) - 1) * PAGINATION_LIMIT,
        });

        query.push({
            $limit: data.limit ? parseInt(data.limit) : PAGINATION_LIMIT,
        });

        return query;
    },

    storeOrder: (data) => {
        let query = [];
        let match = {};

        // Filter by storeId
        if (data.storeId) {
            match["storeId"] = new Dependencies.mongoose.Types.ObjectId(data.storeId);
        }

        // Check if fromDate is provided
        if (data.fromDate) {
            const fromDate = new Date(data.fromDate);

            // Set the time to 00:00:00.000 for the start of the day
            const startOfFromDate = new Date(fromDate.setHours(0, 0, 0, 0));
            // Set the time to 23:59:59.999 for the end of the day
            const endOfFromDate = new Date(fromDate.setHours(23, 59, 59, 999));

            // Match orderDt between the start and end of the given fromDate
            match["orderDt"] = {
                $gte: startOfFromDate,
                $lt: endOfFromDate,
            };
        }

        query.push({ $match: match });

        query.push({
            $sort: { orderDt: -1 }, // Sort by createdAt in ascending order
        });

        query.push({
            $lookup: {
                from: "stores",
                localField: "storeId",
                foreignField: "_id",
                as: "stores",
            },
        });

        query.push({
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdByUser",
            },
        });

        query.push({
            $addFields: {
                store: { $arrayElemAt: ["$stores.storeName", 0] },
                createdBy: { $arrayElemAt: ["$createdByUser.fullName", 0] },
            },
        });

        query.push({
            $project: {
                _id: 1,
                store: 1,
                orderId: 1,
                orderPrice: 1,
                orderDt: 1,
                status: 1,
                createdBy: 1,
            },
        });

        const limit = data.limit ? parseInt(data.limit) : PAGINATION_LIMIT;
        const skip = (parseInt(data.page) - 1) * limit;

        query.push({ $skip: skip });
        query.push({ $limit: limit });

        return query;
    },

    storeOrderItems: (data) => {
        let query = [];
        let match = {};

        // Filter by storeId
        if (data.orderId) match["orderId"] = data?.orderId;

        query.push({ $match: match });

        query.push({
            $unwind: {
                path: "$items",
            },
        });

        query.push({
            $lookup: {
                from: "medicines",
                localField: "items.medicine",
                foreignField: "_id",
                as: "medicine",
            },
        });

        query.push({
            $unwind: "$medicine",
        });

        query.push({
            $lookup: {
                from: "generics",
                localField: "medicine.genericId",
                foreignField: "_id",
                as: "generics",
            },
        });

        query.push({
            $lookup: {
                from: "categories",
                localField: "medicine.categoryId",
                foreignField: "_id",
                as: "category",
            },
        });

        query.push({
            $lookup: {
                from: "brands",
                localField: "medicine.brandId",
                foreignField: "_id",
                as: "brands",
            },
        });

        query.push({
            $lookup: {
                from: "usages",
                localField: "medicine.usageId",
                foreignField: "_id",
                as: "usages",
            },
        });

        query.push({
            $lookup: {
                from: "strengths",
                localField: "medicine.strengthId",
                foreignField: "_id",
                as: "strengths",
            },
        });

        query.push({
            $addFields: {
                generic: { $arrayElemAt: ["$generics.genericName", 0] },
                brand: { $arrayElemAt: ["$brands.brandName", 0] },
                category: { $arrayElemAt: ["$category.categoryName", 0] },
                usage: { $arrayElemAt: ["$usages.usageName", 0] },
                strength: { $arrayElemAt: ["$strengths.strengthName", 0] },
                grandTotal: {
                    $sum: {
                        $multiply: ["$items.quantity", "$medicine.price"],
                    },
                },
            },
        });

        query.push({
            $project: {
                _id: 1,
                medicineName: "$medicine.name",
                price: "$medicine.price",
                quantity: "$items.quantity",
                grandTotal: 1,
                category: 1,
                generic: 1,
                brand: 1,
                usage: 1,
                strength: 1,
            },
        });

        //const limit = data.limit ? parseInt(data.limit) : PAGINATION_LIMIT;
        //const skip = (parseInt(data.page) - 1) * limit;

        //query.push({ $skip: skip });
        //query.push({ $limit: limit });

        return query;
    },

    storeMedicine: (data) => {
        let query = [];
        let match = {};

        // Filter by storeId
        if (data.storeId) {
            match["storeId"] = new Dependencies.mongoose.Types.ObjectId(data.storeId);
        }

        query.push({ $match: match });

        query.push({
            $lookup: {
                from: "medicines",
                localField: "medicineId",
                foreignField: "_id",
                as: "medicine",
            },
        });

        query.push({
            $unwind: "$medicine",
        });

        query.push({
            $lookup: {
                from: "generics",
                localField: "medicine.genericId",
                foreignField: "_id",
                as: "generics",
            },
        });

        query.push({
            $lookup: {
                from: "brands",
                localField: "medicine.brandId",
                foreignField: "_id",
                as: "brands",
            },
        });

        query.push({
            $lookup: {
                from: "categories",
                localField: "medicine.categoryId",
                foreignField: "_id",
                as: "category",
            },
        });

        query.push({
            $lookup: {
                from: "usages",
                localField: "medicine.usageId",
                foreignField: "_id",
                as: "usages",
            },
        });

        query.push({
            $lookup: {
                from: "strengths",
                localField: "medicine.strengthId",
                foreignField: "_id",
                as: "strengths",
            },
        });

        query.push({
            $addFields: {
                generic: { $arrayElemAt: ["$generics.genericName", 0] },
                brand: { $arrayElemAt: ["$brands.brandName", 0] },
                category: { $arrayElemAt: ["$category.categoryName", 0] },
                usage: { $arrayElemAt: ["$usages.usageName", 0] },
                strength: { $arrayElemAt: ["$strengths.strengthName", 0] },
            },
        });

        query.push({
            $project: {
                _id: 1,
                medicine: "$medicine.name",
                price: "$medicine.price",
                quantity: 1,
                expireDate: "$medicine.expireDate",
                unitType: "$medicine.unitType",
                generic: 1,
                category: 1,
                brand: 1,
                strength: 1,
                usage: 1,
                createdBy: "$createdBy.fullName",
                createdAt: 1,
            },
        });

        const limit = data.limit ? parseInt(data.limit) : PAGINATION_LIMIT;
        const skip = (parseInt(data.page) - 1) * limit;

        query.push({ $skip: skip });
        query.push({ $limit: limit });

        return query;
    },
};
