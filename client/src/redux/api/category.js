import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: (queryParams) => `/category/?${queryParams}`,
            keepUnusedDataFor: 5,
            transformResponse: (data) => data?.data || [],
        }),

        getCategoryById: builder.query({
            query: (id) => `/category/${id}`,
            transformResponse: (data) => {
                return data?.data;
            },
        }),

        addCategory: builder.mutation({
            query: (newGeneric) => ({
                url: `/category/`,
                method: "POST",
                body: newGeneric,
            }),
            keepUnusedDataFor: 5,
        }),

        updateCategory: builder.mutation({
            query: ({ categoryId, updateData }) => ({
                url: `/category/${categoryId}`,
                method: "PATCH",
                body: updateData,
            }),
        }),

        actionCategoryOne: builder.mutation({
            query: ({ id, status }) => ({
                url: `/category/action/${id}/${status}`,
                method: "PATCH",
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

