import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import { useState } from "react";

const Header = () => {
    const [hide, setHide] = useState(false);
    const { toggle, setToggle } = useGlobalContext();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light header">
            <div className="container-fluid">
                <span className="navbar-brand toggle-btn" onClick={() => setToggle(!toggle)}>
                    ☰
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
                                    <Link to="#" className="dropdown-item">
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
