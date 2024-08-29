import { BASE_URL } from "./apiConfig";
//--------------Admin User-----------------//

const userRegister = (values) => {
    return {
        url: `${BASE_URL}/admin/register`,
        method: "POST",
        data: values,
    };
};

const userFetch = () => {
    return {
        url: `${BASE_URL}/admin/user`,
        method: "GET",
        data: "",
    };
};

export const apiPoint = { userRegister, userFetch };
