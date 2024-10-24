import { Dependencies } from "../../packages/index.js";
import {
    AdminController,
    AdminMasterController,
    AdminMedicineController,
    AdminStoreController,
} from "../../controllers/index.js";
import Middleware from "../../middlewares/index.js";

const router = Dependencies.Router();

//admin user

router.post("/login", AdminController.adminLogin);
router.post(
    "/register",
    Middleware.userAuth,
    Middleware.checkPermission("create"),
    AdminController.registerAdmin
);
router.get(
    "/currentUser",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminController.currentUser
);
router.get(
    "/get-user/:id",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminController.userOne
);
router.get(
    "/user-list",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminController.userList
);
router.get(
    "/view-profile",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminController.viewProfile
);
router.patch(
    "/edit-profile/:id",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminController.editProfile
);

router.patch(
    "/actionOnUser/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminController.actionOnUser
);
router.patch(
    "/actionOnUser/:id/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminController.actionOnUser
);
router.post(
    "/logout",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminController.adminLogout
);

//Medicine Generic

router.post(
    "/generic",
    Middleware.userAuth,
    Middleware.checkPermission("create"),
    AdminMasterController.addGeneric
);
router.get(
    "/generic",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMasterController.fetchGeneric
);
router.get(
    "/generic/:id",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMasterController.fetchGenericById
);

router.get(
    "/generic-select",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMasterController.fetchGenericSelect
);

router.patch(
    "/generic/:id",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMasterController.updateGeneric
);
router.delete(
    "/generic/:id",
    Middleware.userAuth,
    Middleware.checkPermission("delete"),
    AdminMasterController.deleteGeneric
);
router.patch(
    "/actionOnGeneric/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMasterController.actionOnGeneric
);
router.patch(
    "/generic/action/:id/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMasterController.actionOnGeneric
);

//Medicine Category

router.post(
    "/category",
    Middleware.userAuth,
    Middleware.checkPermission("create"),
    AdminMasterController.addCategory
);
router.get(
    "/category",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMasterController.fetchCategory
);
router.get(
    "/category/:id",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMasterController.fetchCategoryById
);
router.get(
    "/category-select",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMasterController.fetchCategorySelect
);
router.patch(
    "/category/:id",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMasterController.updateCategory
);
router.delete(
    "/category/:id",
    Middleware.userAuth,
    Middleware.checkPermission("delete"),
    AdminMasterController.deleteCategory
);
router.patch(
    "/actionOnCategory/:id/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMasterController.actionOnCategory
);
router.patch(
    "/actionOnCategory/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMasterController.actionOnCategory
);

//Medicine Brand

router.post("/brand", Middleware.userAuth, AdminMasterController.addBrand);
router.get("/brand", Middleware.userAuth, AdminMasterController.fetchBrand);
router.get("/brand/:id", Middleware.userAuth, AdminMasterController.fetchBrandById);
router.get(
    "/brand-select",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMasterController.fetchBrandSelect
);
router.patch("/brand/:id", Middleware.userAuth, AdminMasterController.updateBrand);
router.patch(
    "/actionOnBrand/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMasterController.actionOnBrand
);
router.patch(
    "/actionOnBrand/:id/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMasterController.actionOnBrand
);

//Medicine Strength

router.post("/strength", Middleware.userAuth, AdminMasterController.addStrength);
router.get("/strength", Middleware.userAuth, AdminMasterController.fetchStrength);
router.get("/strength/:id", Middleware.userAuth, AdminMasterController.fetchStrengthById);
router.get(
    "/strength-select",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMasterController.fetchStrengthSelect
);
router.patch("/strength/:id", Middleware.userAuth, AdminMasterController.updateStrength);
router.patch(
    "/actionOnStrength/:status",
    Middleware.userAuth,
    AdminMasterController.actionOnStrength
);
router.patch(
    "/actionOnStrength/:id/:status",
    Middleware.userAuth,
    AdminMasterController.actionOnStrength
);

//Medicine Usage

router.post("/usage", Middleware.userAuth, AdminMasterController.addUsage);
router.get("/usage", Middleware.userAuth, AdminMasterController.fetchUsage);
router.get("/usage/:id", Middleware.userAuth, AdminMasterController.fetchUsageById);
router.get(
    "/usage-select",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMasterController.fetchUsageSelect
);
router.patch("/usage/:id", Middleware.userAuth, AdminMasterController.updateUsage);
router.patch("/actionOnUsage/:status", Middleware.userAuth, AdminMasterController.actionOnUsage);
router.patch(
    "/actionOnUsage/:id/:status",
    Middleware.userAuth,
    AdminMasterController.actionOnUsage
);

// Medicine Store

router.post(
    "/store",
    Middleware.userAuth,
    Middleware.checkPermission("create"),
    AdminStoreController.addStore
);
router.get(
    "/store",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminStoreController.fetchStore
);
router.get(
    "/store/:id",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminStoreController.fetchStoreById
);

router.get(
    "/store-select/",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminStoreController.fetchSelect
);

router.patch(
    "/store/:id",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminStoreController.updateStore
);
router.patch(
    "/actionOnStore/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminStoreController.actionOnStore
);
router.patch(
    "/actionOnStore/:id/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminStoreController.actionOnStore
);

// Medicine Product Inventory

router.post(
    "/medicine",
    Middleware.userAuth,
    Middleware.checkPermission("create"),
    AdminMedicineController.addMedicine
);

router.get(
    "/medicine",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMedicineController.fetchMedicine
);

router.get(
    "/medicine/:id",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminMedicineController.fetchMedicineById
);

router.patch(
    "/medicine/:id",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMedicineController.updateMedicine
);

router.patch(
    "/actionOnMedicine/:id/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMedicineController.actionOnMedicine
);

router.patch(
    "/actionOnMedicine/:status",
    Middleware.userAuth,
    Middleware.checkPermission("update"),
    AdminMedicineController.actionOnMedicine
);

router.get(
    "/medicine-inventory/",
    Middleware.userAuth,
    Middleware.checkPermission("create"),
    AdminMedicineController.fetchMedicineStatistics
);

// Medicine Store Orders

router.post(
    "/store-order",
    Middleware.userAuth,
    Middleware.checkPermission("create"),
    AdminStoreController.createStoreOrder
);

router.get(
    "/store-order/",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminStoreController.fetchStoreOrder
);

router.get(
    "/store-order-items/",
    Middleware.userAuth,
    Middleware.checkPermission("create"),
    AdminStoreController.fetchStoreOrderItems
);

// router.get(
//     "/store-medicine/",
//     Middleware.userAuth,
//     Middleware.checkPermission("read"),
//     AdminStoreController.fetchStoreMedicine
// );

// router.get(
//     "/store-medicine/:id",
//     Middleware.userAuth,
//     Middleware.checkPermission("read"),
//     AdminStoreController.fetchStoreMedicine
// );

router.get(
    "/store-medicine/",
    Middleware.userAuth,
    Middleware.checkPermission("read"),
    AdminStoreController.fetchStoreMedicine
);

export const AdminRoute = router;
