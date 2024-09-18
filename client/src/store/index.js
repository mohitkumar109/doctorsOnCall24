import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cart";
//import apiSlice from "./apiSlice";

const store = configureStore({
    reducer: {
        //[apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer,
    },
    //middleware: (prevMiddlewares) => prevMiddlewares().concat(apiSlice.middleware),
});

export { store };
