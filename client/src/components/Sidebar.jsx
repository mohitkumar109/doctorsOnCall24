import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";

const Sidebar = () => {
    const { auth, toggle } = useGlobalContext();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleToggle = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    return (
        <div className={`sidebar ${toggle && "active"}`}>
            <div className="sidebar-header">Doctor On Call</div>
            {auth === "admin" && (
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/">
                            <i className="bi bi-speedometer"></i>
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="#"
                            className="dropdown-toggle"
                            onClick={() => handleToggle("medicine")}
                        >
                            <i className="bi bi-capsule"></i>
                            Medicine
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "medicine" && "show"
                            }`}
                        >
                            <li>
                                <Link to="/manage-category">
                                    <i className="bi bi-tags" />
                                    Medicine Category
                                </Link>
                            </li>
                            <li>
                                <Link to="/manage-brand">
                                    <i className="bi bi-award" />
                                    Medicine Brand
                                </Link>
                            </li>

                            <li>
                                <Link to="#">
                                    <i className="bi bi-fonts" />
                                    Generic Name
                                </Link>
                            </li>

                            <li>
                                <Link to="#">
                                    <i className="bi bi-file-earmark-medical" />
                                    Form of medicine
                                </Link>
                            </li>

                            <li>
                                <Link to="#">
                                    <i className="bi bi-bar-chart-line" />
                                    Strength of medicine
                                </Link>
                            </li>

                            <li>
                                <Link to="#">
                                    <i className="bi bi-journal-medical" />
                                    Usage of medicine
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link
                            to="#"
                            className="dropdown-toggle"
                            onClick={() => handleToggle("stores")}
                        >
                            <i className="bi bi-truck"></i>
                            Stores
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "stores" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <i className="bi bi-file-earmark-text" />
                                    Manage Store
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="bi bi-file-earmark-text" />
                                    Manage Staff
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link
                            to="#"
                            className="dropdown-toggle"
                            onClick={() => handleToggle("inventory")}
                        >
                            <i className="bi bi-box"></i>
                            Inventory
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "inventory" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <i className="bi bi-person-plus" />
                                    Add Inventory
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="bi bi-file-earmark-text" />
                                    Manage Inventory
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link
                            to="#"
                            className="dropdown-toggle"
                            onClick={() => handleToggle("assign")}
                        >
                            <i className="bi bi-cart"></i>
                            Assign Inventory
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "assign" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <i className="bi bi-file-earmark-text" />
                                    Assign to Store
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link
                            to="#"
                            className="dropdown-toggle"
                            onClick={() => handleToggle("settings")}
                        >
                            <i className="bi bi-gear" />
                            Settings
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "settings" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <i className="bi bi-shield-lock" />
                                    Change Password
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )}

            {auth === "staff" && (
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/">
                            <i className="bi bi-house-door" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="dropdown-toggle"
                            onClick={() => handleToggle("history")}
                        >
                            <i className="bi bi-people" />
                            Inventory
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "history" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <i className="bi bi-person-lines-fill" />
                                    History of Inventory Receive
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
