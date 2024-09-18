import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("addToCart", (state, action) => {
            const item = action.payload;
            const isItemExit = state.cart.find((i) => i._id === item._id);

            if (isItemExit) {
                state.cart = state.cart.map((i) => (i._id === isItemExit._id ? item : i));
            } else {
                state.cart = [...state.cart, item];
            }
            // Optional: Update localStorage after every add to persist state
            localStorage.setItem("cartItems", JSON.stringify(state.cart));
        })
        .addCase("removeFromCart", (state, action) => {
            state.cart = state.cart.filter((i) => i._id !== action.payload);
        });
});
