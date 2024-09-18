// import { createApi } from "@reduxjs/toolkit/query/react";
// import { api } from "../services/apiConfig";

// const apiSlice = createApi({
//     endpoints: function (builder) {
//         return {
//             getAllBrand: builder.query({
//                 queryFn: async () => {
//                     const response = api.get("admin/brand/", {
//                         headers: {
//                             "Content-Type": "application/json",
//                             Accept: "application/json",
//                             Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
//                         },
//                     });
//                     const brands = response.data.results;
//                     return { data: brands };
//                 },
//             }),
//         };
//     },
// });

// export default apiSlice;
// export const { useGetAllBrandQuery } = apiSlice;
