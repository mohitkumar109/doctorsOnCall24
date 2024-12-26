// Token
export const storeToken = (token) => {
    try {
        localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
        console.log("Error getting in store token");
    }
};

export const getToken = () => {
    try {
        return JSON.parse(localStorage.getItem("token"));
    } catch (error) {
        console.log("Error getting in get token");
    }
};
