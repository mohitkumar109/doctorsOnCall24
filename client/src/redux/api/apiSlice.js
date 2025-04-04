import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    // Set credentials option
    //credentials: "include",
    prepareHeaders: (headers) => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        headers.set("X-Tracking-ID", Math.random().toString(36).substring(7));
        //console.log('Request Headers:', headers); // Logging (optional)
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ["GetAllGenericTag"],
    endpoints: () => ({}),
});
