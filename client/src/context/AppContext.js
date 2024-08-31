import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useService from "../hooks/useService";
import { apiEnd } from "../services/adminApi";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const { postData } = useService();
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
            const req = apiEnd.currentUser();
            const res = await postData(req);
            if (res.success === true) {
                setAuth(res?.data?.role);
            } else {
                toast.error(res?.message, { duration: 3000 });
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
