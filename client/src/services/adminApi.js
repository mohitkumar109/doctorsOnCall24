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
        data: null,
    };
};

const getCategorySelect = () => {
    return {
        url: `${BASE_URL}/admin/category-select`,
        method: "GET",
        data: null,
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

const getBrandSelect = () => {
    return {
        url: `${BASE_URL}/admin/brand-select`,
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

const getGenericSelect = () => {
    return {
        url: `${BASE_URL}/admin/generic-select`,
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

const getStrengthSelect = () => {
    return {
        url: `${BASE_URL}/admin/strength-select`,
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

const getUsageSelect = () => {
    return {
        url: `${BASE_URL}/admin/usage-select`,
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

//-------------- Medicine -----------------//

const adMedicine = (values) => {
    return {
        url: `${BASE_URL}/admin/medicine/`,
        method: "POST",
        data: values,
    };
};

const getMedicine = (search, sorting, status, page, category, generic, brand) => {
    return {
        url: `${BASE_URL}/admin/medicine/?search=${search}&sorting=${sorting}&status=${status}&page=${page}&generic=${generic}&category=${category}&brand=${brand}`,
        method: "GET",
        data: null,
    };
};

const getMedicineAll = (search, sorting, status, page) => {
    return {
        url: `${BASE_URL}/admin/medicine/?search=${search}&sorting=${sorting}&status=${status}&page=${page}`,
        method: "GET",
        data: null,
    };
};

const getMedicineById = (id) => {
    return {
        url: `${BASE_URL}/admin/medicine/${id}`,
        method: "GET",
        data: null,
    };
};

const getMedicineSelect = () => {
    return {
        url: `${BASE_URL}/admin/medicine-select/`,
        method: "GET",
        data: null,
    };
};

const updateMedicine = (id, values) => {
    return {
        url: `${BASE_URL}/admin/medicine/${id}`,
        method: "PATCH",
        data: values,
    };
};

const actionMedicineOne = (id, status) => {
    return {
        url: `${BASE_URL}/admin/actionOnMedicine/${id}/${status}`,
        method: "PATCH",
        data: null,
    };
};

const getMedicineInventory = () => {
    return {
        url: `${BASE_URL}/admin/medicine-inventory/`,
        method: "GET",
        data: null,
    };
};

//--------------Medicine Assign to Store-----------------//

const adStoreAssignMedicine = (id, values) => {
    return {
        url: `${BASE_URL}/admin/store-order/`,
        method: "POST",
        data: {
            storeId: id,
            items: values,
        },
    };
};

const getStoreOrderByStoreId = (fromDate, page, storeId) => {
    return {
        url: `${BASE_URL}/admin/store-order/?fromDate=${fromDate}&page=${page}&storeId=${storeId}`,
        method: "GET",
        data: null,
    };
};

const getStoreOrderItemsByOrderId = function (orderId, page) {
    return {
        url: `${BASE_URL}/admin/store-order-items/?orderId=${orderId}&page=${page}`,
        method: "GET",
        data: null,
    };
};

const getStoreMedicine = function (storeId, page) {
    return {
        url: `${BASE_URL}/admin/store-medicine/?storeId=${storeId}&page=${page}`,
        method: "GET",
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
    getCategorySelect,
    updateCategory,
    actionCategoryOne,
    actionCategoryMulti,

    // Brand function
    adBrand,
    getBrand,
    getBrandById,
    getBrandSelect,
    updateBrand,
    actionBrandOne,

    // Generic function
    adGeneric,
    getGeneric,
    getGenericById,
    getGenericSelect,
    updateGeneric,
    actionGenericOne,

    // Strength function
    adStrength,
    getStrength,
    getStrengthById,
    getStrengthSelect,
    updateStrength,
    actionStrengthOne,

    // Usage function
    adUsage,
    getUsage,
    getUsageById,
    getUsageSelect,
    updateUsage,
    actionUsageOne,

    // Store function
    adStore,
    getStore,
    getStoreById,
    getStoreSelect,
    updateStore,
    actionStoreOne,

    //Medicine Products
    adMedicine,
    getMedicine,
    getMedicineAll,
    getMedicineById,
    getMedicineSelect,
    updateMedicine,
    actionMedicineOne,
    getMedicineInventory,

    //Medicine Assign to Store
    adStoreAssignMedicine,
    getStoreOrderByStoreId,
    getStoreOrderItemsByOrderId,
    getStoreMedicine,
};
