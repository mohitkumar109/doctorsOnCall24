import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/users/Dashboard";

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    );
}
