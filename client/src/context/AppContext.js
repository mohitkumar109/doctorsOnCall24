import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useService from "../hooks/useService";
import { apiEnd } from "../services/adminApi";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const { postData } = useService();
    const [auth, setAuth] = useState(null);
    const [cart, setCart] = useState([]);
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

    const removeItemCart = (medicineId) => {
        // Filter out the item with the matching medicineId from the cart
        const updatedCart = cart?.filter((item) => item.medicineId !== medicineId);
        if (updatedCart.length === cart.length) {
            toast.error("Item not found in the cart!");
        }
        setCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update localStorage
        toast.success("Medicine removed from cart!");
    };

    // Function to handle increasing the quantity
    const increaseQuantity = (medicineId) => {
        const updatedCart = cart.map((item) => {
            if (item.medicineId === medicineId) {
                const newQuantity = item.quantity + 1;
                return {
                    ...item,
                    quantity: newQuantity,
                    totalPrice: newQuantity * item.price,
                };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update cart in localStorage
    };

    // Function to handle decreasing the quantity
    const decreaseQuantity = (medicineId) => {
        const updatedCart = cart.map((item) => {
            if (item.medicineId === medicineId && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                return {
                    ...item,
                    quantity: newQuantity,
                    totalPrice: newQuantity * item.price,
                };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update cart in localStorage
    };

    const logout = () => {
        localStorage.clear();
        setAuth(null);
    };

    return (
        <AppContext.Provider
            value={{
                auth,
                setAuth,
                logout,
                toggle,
                setToggle,
                cart,
                setCart,
                increaseQuantity,
                decreaseQuantity,
                removeItemCart,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider };
