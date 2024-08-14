import { Dependencies } from "../../packages/index.js";
import { AdminController, AdminMasterController } from "../../controllers/index.js";
import { adminAuth } from "../../middlewares/index.js";

const router = Dependencies.Router();

//admin user
router.post("/register", AdminController.registerAdmin);
router.post("/login", AdminController.adminLogin);
router.get("/view-profile", adminAuth, AdminController.viewProfile);
router.patch("/edit-profile", adminAuth, AdminController.editProfile);
router.post("/logout", adminAuth, AdminController.adminLogout);

// Medicine generic name
router.post("/generic", adminAuth, AdminMasterController.addGeneric);
router.get("/generic", adminAuth, AdminMasterController.fetchGeneric);
router.get("/generic/:id", adminAuth, AdminMasterController.fetchGenericById);
router.patch("/generic/:id", adminAuth, AdminMasterController.updateGeneric);
router.delete("/generic/:id", adminAuth, AdminMasterController.deleteGeneric);
router.patch("/actionOnGeneric", adminAuth, AdminMasterController.actionOnGeneric);

export const AdminRoute = router;
