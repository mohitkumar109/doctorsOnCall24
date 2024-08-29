import { useState } from "react";
import { Link } from "react-router-dom";
import {
    BsSpeedometer,
    BsCapsule,
    BsTruck,
    BsBox,
    BsCart,
    BsShieldLock,
    BsTools,
    BsCardList,
} from "react-icons/bs";
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
                            <BsSpeedometer className="bi" />
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="#"
                            className="dropdown-toggle"
                            onClick={() => handleToggle("medicine")}
                        >
                            <BsCapsule className="bi" />
                            Medicine
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "medicine" && "show"
                            }`}
                        >
                            <li>
                                <Link to="/manage-category">
                                    <BsCardList className="bi" />
                                    Medicine Category
                                </Link>
                            </li>
                            <li>
                                <Link to="/manage-brand">
                                    <BsCardList className="bi" />
                                    Medicine Brand
                                </Link>
                            </li>

                            <li>
                                <Link to="#">
                                    <BsCardList className="bi" />
                                    Generic Name
                                </Link>
                            </li>

                            <li>
                                <Link to="#">
                                    <BsCardList className="bi" />
                                    Form of medicine
                                </Link>
                            </li>

                            <li>
                                <Link to="#">
                                    <BsCardList className="bi" />
                                    Strength of medicine
                                </Link>
                            </li>

                            <li>
                                <Link to="#">
                                    <BsCardList className="bi" />
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
                            <BsTruck className="bi" />
                            Stores
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "stores" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <BsCardList className="bi" />
                                    Manage Store
                                </Link>
                            </li>
                            <li>
                                <Link to="/manage-user">
                                    <BsCardList className="bi" />
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
                            <BsBox className="bi" />
                            Inventory
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "inventory" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <BsCardList className="bi" />
                                    Add Inventory
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <BsCardList className="bi" />
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
                            <BsCart className="bi" />
                            Assign Inventory
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "assign" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <BsCardList className="bi" />
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
                            <BsTools className="bi" />
                            Settings
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "settings" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <BsShieldLock className="bi" />
                                    Change Password
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )}

            {auth === "user" && (
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/">
                            <BsSpeedometer className="bi" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="dropdown-toggle"
                            onClick={() => handleToggle("history")}
                        >
                            <BsBox className="bi" />
                            Inventory
                        </Link>
                        <ul
                            className={`collapse list-unstyled ${
                                activeDropdown === "history" && "show"
                            }`}
                        >
                            <li>
                                <Link to="#">
                                    <BsCardList className="bi" />
                                    Receive Inventory History
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
