import { BASE_URL } from "./apiConfig";
//--------------Admin User-----------------//

const userRegister = (values) => {
    return {
        url: `${BASE_URL}/admin/register`,
        method: "POST",
        data: values,
    };
};

const currentUser = () => {
    return {
        url: `${BASE_URL}/admin/currentUser`,
        method: "GET",
        data: "",
    };
};

const userFetch = () => {
    return {
        url: `${BASE_URL}/admin/user-list`,
        method: "GET",
        data: "",
    };
};

const updateProfile = (id, values) => {
    return {
        url: `${BASE_URL}/admin/edit-profile/${id}`,
        method: "PATCH",
        data: values,
    };
};

const getUserById = (id) => {
    return {
        url: `${BASE_URL}/admin/get-user/${id}`,
        method: "GET",
        data: null,
    };
};

const actionUserOne = (id, status) => {
    return {
        url: `${BASE_URL}/admin/actionOnUser/${id}/${status}`,
        method: "PATCH",
        data: null,
    };
};

//--------------Medicine Category-----------------//

const adCategory = (values) => {
    return {
        url: `${BASE_URL}/admin/category/`,
        method: "POST",
        data: values,
    };
};

const getCategory = (search, sorting, status, page) => {
    return {
        url: `${BASE_URL}/admin/category/?search=${search}&sorting=${sorting}&status=${status}&page=${page}`,
        method: "GET",
        data: "",
    };
};

const getCategoryById = (id) => {
    return {
        url: `${BASE_URL}/admin/category/${id}`,
        method: "GET",
        data: "",
    };
};

const updateCategory = (id, values) => {
    return {
        url: `${BASE_URL}/admin/category/${id}`,
        method: "PATCH",
        data: values,
    };
};

const actionCategoryOne = (id, status) => {
    return {
        url: `${BASE_URL}/admin/actionOnCategory/${id}/${status}`,
        method: "PATCH",
        data: null,
    };
};

const actionCategoryMulti = (status, values) => {
    return {
        url: `${BASE_URL}/admin/actionOnCategory/${status}`,
        method: "PATCH",
        data: values,
    };
};

//--------------Medicine Brand-----------------//

const adBrand = (values) => {
    return {
        url: `${BASE_URL}/admin/brand/`,
        method: "POST",
        data: values,
    };
};

const getBrand = (search, sorting, status, page) => {
    return {
        url: `${BASE_URL}/admin/brand/?search=${search}&sorting=${sorting}&status=${status}&page=${page}`,
        method: "GET",
        data: null,
    };
};

const getBrandById = (id) => {
    return {
        url: `${BASE_URL}/admin/brand/${id}`,
        method: "GET",
        data: null,
    };
};

const updateBrand = (id, values) => {
    return {
        url: `${BASE_URL}/admin/brand/${id}`,
        method: "PATCH",
        data: values,
    };
};

const actionBrandOne = (id, status) => {
    return {
        url: `${BASE_URL}/admin/actionOnBrand/${id}/${status}`,
        method: "PATCH",
        data: null,
    };
};

export const apiEnd = {
    userRegister,
    userFetch,
    getUserById,
    currentUser,
    updateProfile,
    actionUserOne,

    adCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    actionCategoryOne,
    actionCategoryMulti,

    adBrand,
    getBrand,
    getBrandById,
    updateBrand,
    actionBrandOne,
};
