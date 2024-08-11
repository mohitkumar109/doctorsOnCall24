import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";
import ManageCategory from "../pages/admin/category/ManageCategory";
import AddCategory from "../pages/admin/category/AddCategory";
import ManageBrand from "../pages/admin/brand/ManageBrand";
import AddBrand from "../pages/admin/brand/AddBrand";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manage-category" element={<ManageCategory />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/manage-brand" element={<ManageBrand />} />
            <Route path="/add-brand" element={<AddBrand />} />
        </Routes>
    );
}
