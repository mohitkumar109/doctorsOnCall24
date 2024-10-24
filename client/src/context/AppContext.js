import React, { useState, useEffect, createContext, useContext } from "react";
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

    const addToCart = (medicine, quantity, price) => {
        // Convert quantity to a number
        const parsedQuantity = parseInt(quantity, 10);

        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            toast.error("Please enter a valid quantity");
            return;
        }

        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.medicine === medicine);

            let updatedCart;
            if (existingItemIndex !== -1) {
                // If medicine already exists in the cart, update the quantity
                updatedCart = prevCart.map((item, index) =>
                    index === existingItemIndex
                        ? {
                              ...item,
                              quantity: item.quantity + parsedQuantity,
                              //totalPrice: (item.quantity + parsedQuantity) * price,
                          }
                        : item
                );
            } else {
                // If medicine doesn't exist in the cart, add a new entry
                const newItem = {
                    medicine,
                    quantity: parsedQuantity,
                    price: parseFloat(price),
                    //totalPrice: parsedQuantity * price,
                };
                updatedCart = [...prevCart, newItem];
            }

            // Store the updated cart in localStorage
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));

            return updatedCart;
        });

        toast.success("Medicine added to cart!");
    };

    const removeItemCart = (medicine) => {
        // Filter out the item with the matching medicineId from the cart
        const updatedCart = cart?.filter((item) => item.medicine !== medicine);
        if (updatedCart.length === cart.length) {
            toast.error("Item not found in the cart!");
        }
        setCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update localStorage
        toast.success("Medicine removed from cart!");
    };

    // Function to handle increasing the quantity
    const increaseQty = (medicine) => {
        const updatedCart = cart.map((item) => {
            if (item.medicine === medicine) {
                const newQuantity = item.quantity + 1;
                return {
                    ...item,
                    quantity: newQuantity,
                    //totalPrice: newQuantity * item.price,
                };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update cart in localStorage
    };

    // Function to handle decreasing the quantity
    const decreaseQty = (medicine) => {
        const updatedCart = cart.map((item) => {
            if (item.medicine === medicine && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                return {
                    ...item,
                    quantity: newQuantity,
                    //totalPrice: newQuantity * item.price,
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
                addToCart,
                cart,
                setCart,
                increaseQty,
                decreaseQty,
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
