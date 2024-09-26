import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsList, BsPeople, BsBoxArrowRight } from "react-icons/bs";
import { useGlobalContext } from "../context/AppContext";
import UpdateProfileModel from "../components/UpdateProfileModel";

const Header = () => {
    const { toggle, setToggle, logout } = useGlobalContext();
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleProfileClick = () => {
        setOpen(true); // Open the profile modal
        setHide(false); // Hide the dropdown menu
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark topNavbar">
            <div className="container-fluid">
                <span className="navbar-brand toggle-btn" onClick={() => setToggle(!toggle)}>
                    <BsList />
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
                                    <button className="dropdown-item" onClick={handleProfileClick}>
                                        <BsPeople /> Profile
                                    </button>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item" onClick={handleLogout}>
                                        <BsBoxArrowRight /> Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                {open && <UpdateProfileModel open={open} setOpen={setOpen} />}
            </div>
        </nav>
    );
};

export default Header;
