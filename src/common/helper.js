import { Dependencies } from "../packages/index.js";
import { ApiError } from "../utils/ApiError.js";

let OnConsole = (message, data) => {
    console.log(message);
    if (data) {
        console.log("***************************");
        console.log(data);
        console.log("***************************");
    }
};

let capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

function actionOnSingleId(id, status, model) {
    if (!Dependencies.mongoose.isValidObjectId(id)) {
        throw new ApiError(404, "Id is invalid.");
    }
    switch (status) {
        case "active":
            return model.findByIdAndUpdate(id, { status: "active" }, { new: true });
        case "inactive":
            return model.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        case "delete":
            return model.findByIdAndDelete(id);
        default:
            throw new ApiError(400, "Please select a valid type.");
    }
}

function actionOnMultipleIds(ids, status, model) {
    const validIds = ids
        .map((id) => new Dependencies.mongoose.Types.ObjectId(id))
        .filter((id) => Dependencies.mongoose.isValidObjectId(id));
    if (validIds.length !== ids.length) {
        throw new ApiError(400, "One or more provided IDs are invalid.");
    }
    switch (status) {
        case "active":
            return model.updateMany({ _id: { $in: ids } }, { status: "active" });
        case "inactive":
            return model.updateMany({ _id: { $in: ids } }, { status: "inactive" });
        case "delete":
            return model.deleteMany({ _id: { $in: ids } });
        default:
            throw new ApiError(400, "Please select a valid type.");
    }
}

export const Helpers = {
    OnConsole,
    capitalize,
    actionOnSingleId,
    actionOnMultipleIds,
};
