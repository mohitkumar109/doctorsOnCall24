import { useGlobalContext } from "../context/AppContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthRoutes from "../routes/AuthRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import UserRoutes from "../routes/UserRoutes";

export default function Layout() {
    const { auth, toggle } = useGlobalContext();

    if (!auth) {
        return <AuthRoutes />;
    }

    const isAdmin = auth === "admin";

    return (
        <>
            <Sidebar />
            <div className={`content ${toggle && "active"}`}>
                <Header />
                {isAdmin ? <AdminRoutes /> : <UserRoutes />}
            </div>
        </>
    );
}
