import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
    sorting: "",
    status: "",
    page: 1,
    pagination: {},
    records: [],
};

const genericSlice = createSlice({
    name: "generic",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSorting: (state, action) => {
            state.sorting = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setRecords: (state, action) => {
            state.records = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
    },
});

export const { setSearch, setSorting, setStatus, setPage, setPagination, setRecords } =
    genericSlice.actions;
export default genericSlice.reducer;
