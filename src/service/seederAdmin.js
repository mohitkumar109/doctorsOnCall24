import { MODEL } from "../models/index.js";
import { Helpers } from "../common/index.js";

export const createAdmin = function (admins) {
    try {
        admins?.forEach(async function (admin) {
            let checkAdminExists = await MODEL.User.findOne({ email: admin.email });
            if (!checkAdminExists) {
                await new MODEL.User({
                    email: admin?.email,
                    fullName: admin?.name,
                    password: "admin@123",
                    role: "admin",
                }).save();
            }
        });
        return true;
    } catch (error) {
        Helpers.OnConsole(`Error inside createAdmin`, error);
    }
};
