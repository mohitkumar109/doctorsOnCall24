import { useGlobalContext } from "../context/AppContext";
import AdminRoutes from "../routes/AdminRoutes";
import AuthRoutes from "../routes/AuthRoutes";
import UserRoutes from "../routes/UserRoutes";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Layout() {
    const { auth, toggle } = useGlobalContext();
    return (
        <>
            {!auth ? (
                <AuthRoutes />
            ) : auth === "admin" ? (
                <>
                    <Sidebar />
                    <div className={`content ${toggle && "active"}`}>
                        <Header />
                        <AdminRoutes />
                    </div>
                </>
            ) : (
                <>
                    <Sidebar />
                    <div className={`content ${toggle && "active"}`}>
                        <Header />
                        <UserRoutes />
                    </div>
                </>
            )}
        </>
    );
}
