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
            queryFn: async (newGeneric, _queryApi, _extraOptions, baseQuery) => {
                // Simulate a delay (e.g., 2 seconds)
                await new Promise((resolve) => setTimeout(resolve, 300));
                // After the delay, proceed with the actual POST request
                const result = await baseQuery({
                    url: `/generic/`,
                    method: "POST",
                    body: newGeneric,
                });

                return result; // Return the result of the API call
            },
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
