import { User } from "./userModel.js";
import { Generic } from "./genericModel.js";
import { Category } from "./categoryModel.js";
import { Brand } from "./brandModel.js";
import { Strength } from "./strengthModel.js";
import { Usage } from "./usageModel.js";
import { Store } from "./storeModel.js";
import { Medicine, getMedicineName } from "./medicineModel.js";
import { MedicineInvtLog } from "./medicineInventoryLogModel.js";
import { MedicineOrder } from "./medicineOrderModel.js";
import { StoreMedicine } from "./storeMedicineModel.js";

export const MODEL = {
    User,
    Generic,
    Category,
    Brand,
    Strength,
    Usage,
    Store,
    Medicine,
    MedicineInvtLog,
    getMedicineName,
    MedicineOrder,
    StoreMedicine,
};
Object.freeze(MODEL)