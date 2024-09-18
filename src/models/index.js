import { User } from "./userModel.js";
import { Generic } from "./genericModel.js";
import { Category } from "./categoryModel.js";
import { Brand } from "./brandModel.js";
import { Strength } from "./strengthModel.js";
import { Usage } from "./usageModel.js";
import { Store } from "./storeModel.js";
import { Medicine, getMedicineName } from "./medicineModel.js";
import { StoreInventory } from "./storeInventoryModel.js";
import { StoreCart } from "./storeCartModel.js";

export const MODEL = {
    User,
    Generic,
    Category,
    Brand,
    Strength,
    Usage,
    Store,
    Medicine,
    getMedicineName,
    StoreInventory,
    StoreCart,
};
