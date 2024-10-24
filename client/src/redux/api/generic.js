import { apiSlice } from "./apiSlice.js";

export const genericApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllGeneric: builder.query({
            query: (queryParams) => `/generic/?${queryParams}`,
            keepUnusedDataFor: 5,
            providesTags: ["GetAllGenericTag"],
            transformResponse: (data) => data?.data || [],
        }),

        getGenericById: builder.query({
            query: (id) => `/generic/${id}`,
            transformResponse: (data) => {
                return data?.data;
            },
            invalidatesTags: ["GetAllGenericTag"],
        }),

        addGeneric: builder.mutation({
            query: (newGeneric) => ({
                url: `/generic/`,
                method: "POST",
                body: newGeneric,
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["GetAllGenericTag"],
        }),

        updateGeneric: builder.mutation({
            query: ({ genericId, updateData }) => ({
                url: `/generic/${genericId}`,
                method: "PATCH",
                body: updateData,
            }),
            invalidatesTags: ["GetAllGenericTag"],
        }),

        actionGenericOne: builder.mutation({
            query: ({ id, status }) => ({
                url: `/generic/action/${id}/${status}`,
                method: "PATCH",
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["GetAllGenericTag"],
        }),
    }),
});

export const {
    useGetAllGenericQuery,
    useGetGenericByIdQuery,
    useAddGenericMutation,
    useUpdateGenericMutation,
    useActionGenericOneMutation,
} = genericApiSlice;
