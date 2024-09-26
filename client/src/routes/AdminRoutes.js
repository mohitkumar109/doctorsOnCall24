import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";
import ManageUser from "../pages/admin/adminusers/ManageUser";
import AddUser from "../pages/admin/adminusers/AddUser";

import ManageCategory from "../pages/admin/category/ManageCategory";
import AddCategory from "../pages/admin/category/AddCategory";

import ManageBrand from "../pages/admin/brand/ManageBrand";
import AddBrand from "../pages/admin/brand/AddBrand";

import ManageGeneric from "../pages/admin/generic/ManageGeneric";
import AddGeneric from "../pages/admin/generic/AddGeneric";

import ManageStrength from "../pages/admin/strength/ManageStrength";
import AddStrength from "../pages/admin/strength/AddStrength";

import ManageUsages from "../pages/admin/usages/ManageUsages";
import AddUsages from "../pages/admin/usages/AddUsages";

import ManageStore from "../pages/admin/store/ManageStore";
import AddStore from "../pages/admin/store/AddStore";

import ManageMedicine from "../pages/admin/medicine/ManageMedicine";
import AddMedicine from "../pages/admin/medicine/AddMedicine";

import Store from "../pages/admin/storeInventory/Store";
import AddToStore from "../pages/admin/storeInventory/AddToStore";
import StoreCart from "../pages/admin/storeInventory/StoreCart";

import Test from "../pages/Test";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/manage-user" element={<ManageUser />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<AddUser />} />

            <Route path="/manage-category" element={<ManageCategory />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/edit-category/:id" element={<AddCategory />} />

            <Route path="/manage-brand" element={<ManageBrand />} />
            <Route path="/add-brand" element={<AddBrand />} />
            <Route path="/edit-brand/:id" element={<AddBrand />} />

            <Route path="/manage-generic" element={<ManageGeneric />} />
            <Route path="/add-generic" element={<AddGeneric />} />
            <Route path="/edit-generic/:id" element={<AddGeneric />} />

            <Route path="/manage-strength" element={<ManageStrength />} />
            <Route path="/add-strength" element={<AddStrength />} />
            <Route path="/edit-strength/:id" element={<AddStrength />} />

            <Route path="/manage-usage" element={<ManageUsages />} />
            <Route path="/add-usage" element={<AddUsages />} />
            <Route path="/edit-usage/:id" element={<AddUsages />} />

            <Route path="/manage-store" element={<ManageStore />} />
            <Route path="/add-store" element={<AddStore />} />
            <Route path="/edit-store/:id" element={<AddStore />} />

            <Route path="/manage-medicine" element={<ManageMedicine />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/edit-medicine/:id" element={<AddMedicine />} />

            <Route path="/select-store/" element={<Store />} />
            <Route path="/add-store-cart/:id" element={<AddToStore />} />
            <Route path="/store-cart/:id" element={<StoreCart />} />

            <Route path="/test/" element={<Test />} />
        </Routes>
    );
}
