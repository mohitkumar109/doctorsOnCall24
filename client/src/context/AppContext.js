import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [auth, setAuth] = useState("admin");
    const [toggle, setToggle] = useState(false);
    return (
        <AppContext.Provider value={{ auth, setAuth, toggle, setToggle }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider };
