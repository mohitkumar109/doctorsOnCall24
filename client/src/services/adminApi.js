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

//--------------Medicine Generic-----------------//

const adGeneric = (values) => {
    return {
        url: `${BASE_URL}/admin/generic/`,
        method: "POST",
        data: values,
    };
};

const getGeneric = (search, sorting, status, page) => {
    return {
        url: `${BASE_URL}/admin/generic/?search=${search}&sorting=${sorting}&status=${status}&page=${page}`,
        method: "GET",
        data: null,
    };
};

const getGenericById = (id) => {
    return {
        url: `${BASE_URL}/admin/generic/${id}`,
        method: "GET",
        data: null,
    };
};

const updateGeneric = (id, values) => {
    return {
        url: `${BASE_URL}/admin/generic/${id}`,
        method: "PATCH",
        data: values,
    };
};

const actionGenericOne = (id, status) => {
    return {
        url: `${BASE_URL}/admin/actionOnGeneric/${id}/${status}`,
        method: "PATCH",
        data: null,
    };
};

//--------------Medicine Strength-----------------//

const adStrength = (values) => {
    return {
        url: `${BASE_URL}/admin/strength/`,
        method: "POST",
        data: values,
    };
};

const getStrength = (search, sorting, status, page) => {
    return {
        url: `${BASE_URL}/admin/strength/?search=${search}&sorting=${sorting}&status=${status}&page=${page}`,
        method: "GET",
        data: null,
    };
};

const getStrengthById = (id) => {
    return {
        url: `${BASE_URL}/admin/strength/${id}`,
        method: "GET",
        data: null,
    };
};

const updateStrength = (id, values) => {
    return {
        url: `${BASE_URL}/admin/strength/${id}`,
        method: "PATCH",
        data: values,
    };
};

const actionStrengthOne = (id, status) => {
    return {
        url: `${BASE_URL}/admin/actionOnStrength/${id}/${status}`,
        method: "PATCH",
        data: null,
    };
};

//--------------Medicine Usage-----------------//

const adUsage = (values) => {
    return {
        url: `${BASE_URL}/admin/usage/`,
        method: "POST",
        data: values,
    };
};

const getUsage = (search, sorting, status, page) => {
    return {
        url: `${BASE_URL}/admin/usage/?search=${search}&sorting=${sorting}&status=${status}&page=${page}`,
        method: "GET",
        data: null,
    };
};

const getUsageById = (id) => {
    return {
        url: `${BASE_URL}/admin/usage/${id}`,
        method: "GET",
        data: null,
    };
};

const updateUsage = (id, values) => {
    return {
        url: `${BASE_URL}/admin/usage/${id}`,
        method: "PATCH",
        data: values,
    };
};

const actionUsageOne = (id, status) => {
    return {
        url: `${BASE_URL}/admin/actionOnUsage/${id}/${status}`,
        method: "PATCH",
        data: null,
    };
};

//--------------Medicine Store-----------------//

const adStore = (values) => {
    return {
        url: `${BASE_URL}/admin/store/`,
        method: "POST",
        data: values,
    };
};

const getStore = (search, sorting, status, page) => {
    return {
        url: `${BASE_URL}/admin/store/?search=${search}&sorting=${sorting}&status=${status}&page=${page}`,
        method: "GET",
        data: null,
    };
};

const getStoreById = (id) => {
    return {
        url: `${BASE_URL}/admin/store/${id}`,
        method: "GET",
        data: null,
    };
};

const getStoreSelect = () => {
    return {
        url: `${BASE_URL}/admin/store-select/`,
        method: "GET",
        data: null,
    };
};

const updateStore = (id, values) => {
    return {
        url: `${BASE_URL}/admin/store/${id}`,
        method: "PATCH",
        data: values,
    };
};

const actionStoreOne = (id, status) => {
    return {
        url: `${BASE_URL}/admin/actionOnStore/${id}/${status}`,
        method: "PATCH",
        data: null,
    };
};

export const apiEnd = {
    // User function
    userRegister,
    userFetch,
    getUserById,
    currentUser,
    updateProfile,
    actionUserOne,

    // Category function
    adCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    actionCategoryOne,
    actionCategoryMulti,

    // Brand function
    adBrand,
    getBrand,
    getBrandById,
    updateBrand,
    actionBrandOne,

    // Generic function
    adGeneric,
    getGeneric,
    getGenericById,
    updateGeneric,
    actionGenericOne,

    // Strength function
    adStrength,
    getStrength,
    getStrengthById,
    updateStrength,
    actionStrengthOne,

    // Usage function
    adUsage,
    getUsage,
    getUsageById,
    updateUsage,
    actionUsageOne,

    // Store function
    adStore,
    getStore,
    getStoreById,
    getStoreSelect,
    updateStore,
    actionStoreOne,
};
