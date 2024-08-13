import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";

const Header = () => {
    const [hide, setHide] = useState(false);
    const { toggle, setToggle, logout } = useGlobalContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark topNavbar">
            <div className="container-fluid">
                <span className="navbar-brand toggle-btn" onClick={() => setToggle(!toggle)}>
                    <i className="bi bi-list"></i>
                </span>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <Link
                                to="#"
                                className="nav-link dropdown-toggle"
                                role="button"
                                onClick={() => setHide(!hide)}
                            >
                                <img
                                    src="/images/profile.jpg"
                                    className="rounded-circle"
                                    alt="User Profile"
                                    width="30"
                                    height="30"
                                />
                                Mohit Kumar
                            </Link>
                            <ul className={`dropdown-menu dropdown-menu-end ${hide && "show"}`}>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <i className="bi bi-people"></i> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right"></i> Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
