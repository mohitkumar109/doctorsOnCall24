import { Dependencies } from "../packages/index.js";
import { PAGINATION_LIMIT } from "../common/constants.js";

export const AdminMasterQueryBuilder = {
    genericList: (data) => {
        let query = [];
        let match = {};

        if (data.status) {
            match["status"] = data.status;
        }

        if (data.search) {
            match["genericName"] = { $regex: data.search, $options: "i" };
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
                createdBy: { $arrayElemAt: ["$createdByUser", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser", 0] },
            },
        });

        query.push({
            $project: {
                genericName: 1,
                status: 1,
                "createdBy.fullName": 1,
                "updatedBy.fullName": 1,
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
                createdBy: { $arrayElemAt: ["$createdByUser", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser", 0] },
            },
        });

        query.push({
            $project: {
                categoryName: 1,
                status: 1,
                "createdBy.fullName": 1,
                "updatedBy.fullName": 1,
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
                createdBy: { $arrayElemAt: ["$createdByUser", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser", 0] },
            },
        });

        query.push({
            $project: {
                brandName: 1,
                status: 1,
                "createdBy.fullName": 1,
                "updatedBy.fullName": 1,
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
                createdBy: { $arrayElemAt: ["$createdByUser", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser", 0] },
            },
        });

        query.push({
            $project: {
                categoryName: 1,
                status: 1,
                "createdBy.fullName": 1,
                "updatedBy.fullName": 1,
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
                createdBy: { $arrayElemAt: ["$createdByUser", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser", 0] },
            },
        });

        query.push({
            $project: {
                usageName: 1,
                status: 1,
                "createdBy.fullName": 1,
                "updatedBy.fullName": 1,
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
            match["genericId"] = new Dependencies.mongoose.Types.ObjectId(data.generic);
        }

        // Filter by categoryId
        if (data.category) {
            match["categoryId"] = new Dependencies.mongoose.Types.ObjectId(data.category);
        }

        // Filter by brandId
        if (data.brand) {
            match["brandId"] = new Dependencies.mongoose.Types.ObjectId(data.brand);
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
                generic: { $arrayElemAt: ["$generic", 0] },
                category: { $arrayElemAt: ["$category", 0] },
                brand: { $arrayElemAt: ["$brand", 0] },
                strength: { $arrayElemAt: ["$strength", 0] },
                usage: { $arrayElemAt: ["$usage", 0] },
                createdBy: { $arrayElemAt: ["$createdByUser", 0] },
                updatedBy: { $arrayElemAt: ["$updatedByUser", 0] },
            },
        });

        query.push({
            $project: {
                name: 1,
                stock: 1,
                price: 1,
                expireDate: 1,
                status: 1,
                createdAt: 1,
                generic: { _id: 1, genericName: 1 },
                category: { _id: 1, categoryName: 1 },
                brand: { _id: 1, brandName: 1 },
                strength: { _id: 1, strengthName: 1 },
                usage: { _id: 1, usageName: 1 },
                "createdBy.fullName": 1,
                "updatedBy.fullName": 1,
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
};
