import { Dependencies } from "../../packages/index.js";
import { AdminController, AdminMasterController } from "../../controllers/index.js";
import { userAuth, checkPermission } from "../../middlewares/index.js";

const router = Dependencies.Router();

//admin user
router.post("/login", AdminController.adminLogin);
router.post("/register", userAuth, checkPermission("create"), AdminController.registerAdmin);
router.get("/currentUser", userAuth, checkPermission("read"), AdminController.currentUser);
router.get("/get-user/:id", userAuth, checkPermission("read"), AdminController.userOne);
router.get("/user-list", userAuth, checkPermission("read"), AdminController.userList);
router.get("/view-profile", userAuth, checkPermission("read"), AdminController.viewProfile);
router.patch("/edit-profile/:id", userAuth, checkPermission("update"), AdminController.editProfile);

router.patch(
    "/actionOnUser/:status",
    userAuth,
    checkPermission("update"),
    AdminController.actionOnUser
);
router.patch(
    "/actionOnUser/:id/:status",
    userAuth,
    checkPermission("update"),
    AdminController.actionOnUser
);
router.post("/logout", userAuth, checkPermission("read"), AdminController.adminLogout);

//Medicine Generic
router.post("/generic", userAuth, checkPermission("create"), AdminMasterController.addGeneric);
router.get("/generic", userAuth, checkPermission("read"), AdminMasterController.fetchGeneric);
router.get(
    "/generic/:id",
    userAuth,
    checkPermission("read"),
    AdminMasterController.fetchGenericById
);
router.patch(
    "/generic/:id",
    userAuth,
    checkPermission("update"),
    AdminMasterController.updateGeneric
);
router.delete(
    "/generic/:id",
    userAuth,
    checkPermission("delete"),
    AdminMasterController.deleteGeneric
);
router.patch(
    "/actionOnGeneric",
    userAuth,
    checkPermission("update"),
    AdminMasterController.actionOnGeneric
);
router.patch(
    "/actionOnGeneric/:id",
    userAuth,
    checkPermission("update"),
    AdminMasterController.actionOnGeneric
);

//Medicine Category
router.post("/category", userAuth, AdminMasterController.addCategory);
router.get("/category", userAuth, AdminMasterController.fetchCategory);
router.get("/category/:id", userAuth, AdminMasterController.fetchCategoryById);
router.patch("/category/:id", userAuth, AdminMasterController.updateCategory);
router.delete(
    "/category/:id",
    userAuth,
    checkPermission("delete"),
    AdminMasterController.deleteCategory
);
router.patch(
    "/actionOnCategory/:id/:status",
    userAuth,
    checkPermission("update"),
    AdminMasterController.actionOnCategory
);
router.patch(
    "/actionOnCategory/:status",
    userAuth,
    checkPermission("update"),
    AdminMasterController.actionOnCategory
);

//Medicine Brand
router.post("/brand", userAuth, AdminMasterController.addBrand);
router.get("/brand", userAuth, AdminMasterController.fetchBrand);
router.get("/brand/:id", userAuth, AdminMasterController.fetchBrandById);
router.patch("/brand/:id", userAuth, AdminMasterController.updateBrand);
router.patch(
    "/actionOnBrand/:status",
    userAuth,
    checkPermission("update"),
    AdminMasterController.actionOnBrand
);
router.patch(
    "/actionOnBrand/:id/:status",
    userAuth,
    checkPermission("update"),
    AdminMasterController.actionOnBrand
);

//Medicine Strength
router.post("/strength", userAuth, AdminMasterController.addStrength);
router.get("/strength", userAuth, AdminMasterController.fetchStrength);
router.get("/strength/:id", userAuth, AdminMasterController.fetchStrengthById);
router.patch("/strength/:id", userAuth, AdminMasterController.updateStrength);
router.patch("/actionOnStrength/:status", userAuth, AdminMasterController.actionOnStrength);
router.patch("/actionOnStrength/:id/:status", userAuth, AdminMasterController.actionOnStrength);

//Medicine Usage
router.post("/usage", userAuth, AdminMasterController.addUsage);
router.get("/usage", userAuth, AdminMasterController.fetchUsage);
router.get("/usage/:id", userAuth, AdminMasterController.fetchUsageById);
router.patch("/usage/:id", userAuth, AdminMasterController.updateUsage);
router.patch("/actionOnUsage/:status", userAuth, AdminMasterController.actionOnUsage);
router.patch("/actionOnUsage/:id/:status", userAuth, AdminMasterController.actionOnUsage);

//Medicine Store
router.post("/store", userAuth, checkPermission("create"), AdminMasterController.addStore);
router.get("/store", userAuth, checkPermission("read"), AdminMasterController.fetchStore);
router.get("/store/:id", userAuth, checkPermission("read"), AdminMasterController.fetchStoreById);
router.patch("/store/:id", userAuth, checkPermission("update"), AdminMasterController.updateStore);
router.patch(
    "/actionOnStore/:status",
    userAuth,
    checkPermission("update"),
    AdminMasterController.actionOnStore
);
router.patch(
    "/actionOnStore/:id/:status",
    userAuth,
    checkPermission("update"),
    AdminMasterController.actionOnStore
);

export const AdminRoute = router;
