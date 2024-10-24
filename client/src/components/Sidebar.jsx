import { useState } from "react";
import { Link } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import { useGlobalContext } from "../context/AppContext";

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: <BsIcons.BsSpeedometer className="bi" />,
                label: "Dashboard",
                href: "/",
                visible: ["admin", "user"],
            },
            {
                icon: <BsIcons.BsTruck className="bi" />,
                label: "Stores",
                href: "#",
                visible: ["admin"],
                subItems: [
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Manage Stores",
                        href: "/manage-store",
                        visible: ["admin"],
                    },
                ],
            },
            {
                icon: <BsIcons.BsCapsule className="bi" />,
                label: "Medicine Master",
                href: "#",
                visible: ["admin"],
                subItems: [
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Medicine Generic",
                        href: "/manage-generic",
                        visible: ["admin"],
                    },
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Medicine Category",
                        href: "/manage-category",
                        visible: ["admin"],
                    },
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Medicine Brand",
                        href: "/manage-brand",
                        visible: ["admin"],
                    },
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Medicine Strength",
                        href: "/manage-strength",
                        visible: ["admin"],
                    },
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Medicine Usage",
                        href: "/manage-usage",
                        visible: ["admin"],
                    },
                ],
            },

            {
                icon: <BsIcons.BsBox className="bi" />,
                label: "Medicine Inventory",
                href: "#",
                visible: ["admin", "user"],
                subItems: [
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Manage Medicine",
                        href: "/manage-medicine",
                        visible: ["admin"],
                    },

                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Medicine Assign",
                        href: "/select-store",
                        visible: ["admin"],
                    },
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Current Inventory",
                        href: "/current-inventory",
                        visible: ["admin"],
                    },

                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Receive Inventory History",
                        href: "/inventory-history",
                        visible: ["user"],
                    },
                ],
            },

            {
                icon: <BsIcons.BsCart className="bi" />,
                label: "Store Inventory",
                href: "#",
                visible: ["admin"],
                subItems: [
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Store Orders",
                        href: "/store-orders/",
                        visible: ["admin"],
                    },
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Store Medicine",
                        href: "/select-store-medicine/",
                        visible: ["admin"],
                    },
                ],
            },
            {
                icon: <BsIcons.BsCart className="bi" />,
                label: "Low Stocks",
                href: "#",
                visible: ["admin"],
                subItems: [
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Low Stock Reports",
                        href: "/low-stock-medicine",
                        visible: ["admin"],
                    },
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Store Low Stock Reports",
                        href: "/low-stock-medicine",
                        visible: ["admin"],
                    },
                ],
            },
        ],
    },

    {
        title: "OTHER",
        items: [
            {
                icon: <BsIcons.BsTruck className="bi" />,
                label: "Users",
                href: "#",
                visible: ["admin"],
                subItems: [
                    {
                        icon: <BsIcons.BsCardList className="bi" />,
                        label: "Manage Users",
                        href: "/manage-user",
                        visible: ["admin"],
                    },
                ],
            },
            {
                icon: <BsIcons.BsTools className="bi" />,
                label: "Settings",
                href: "#",
                visible: ["admin", "user"],
                subItems: [
                    {
                        icon: <BsIcons.BsPeople className="bi" />,
                        label: "Profile",
                        href: "/profile",
                        visible: ["admin", "user"],
                    },
                    {
                        icon: <BsIcons.BsShieldLock className="bi" />,
                        label: "Change Password",
                        href: "/change-password",
                        visible: ["admin", "user"],
                    },
                    {
                        icon: <BsIcons.BsBoxArrowRight className="bi" />,
                        label: "Logout",
                        href: "/logout",
                        visible: ["admin", "user"],
                    },
                ],
            },
        ],
    },
    // ...other menu sections
];

const Sidebar = () => {
    const { auth, toggle } = useGlobalContext();
    const [activeSubItems, setActiveSubItems] = useState(null);

    const handleSubItemToggle = (subitem) => {
        setActiveSubItems(activeSubItems === subitem ? null : subitem);
    };

    const renderMenuItems = (items) => {
        return items
            .filter((item) => item.visible.includes(auth))
            .map((item) => {
                return (
                    <li key={item.label}>
                        <Link
                            to={item.href || "#"}
                            className={item.subItems ? "dropdown-toggle" : ""}
                            onClick={() => item.subItems && handleSubItemToggle(item.label)}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                        {item.subItems && (
                            <ul
                                className={`collapse list-unstyled ${
                                    activeSubItems === item.label && "show"
                                }`}
                            >
                                {renderMenuItems(item.subItems)}
                            </ul>
                        )}
                    </li>
                );
            });
    };

    return (
        <div className={`sidebar accordion ${toggle && "active"}`}>
            <div className="sidebar-header ps-3">Doctor On Call</div>
            <ul className="list-unstyled components">
                {menuItems.map((section) => (
                    <div key={section.title}>
                        <span className="section-title m-4 pt-1">{section.title}</span>
                        {renderMenuItems(section.items)}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
