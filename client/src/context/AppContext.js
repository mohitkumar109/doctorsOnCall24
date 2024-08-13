import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../services/apiConfig";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            checkUser();
        }
    }, []);

    const checkUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                withCredentials: true,
            });
            if (response?.data?.success) {
                //console.log("User data fetched successfully:", response);
                setAuth(response?.data?.data?.role);
            } else {
                console.log("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const logout = () => {
        localStorage.clear();
        setAuth(null);
    };

    return (
        <AppContext.Provider value={{ auth, setAuth, logout, toggle, setToggle }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider };
