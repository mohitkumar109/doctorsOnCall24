let OnConsole = (message, data) => {
    console.log(message);
    if (data) {
        console.log("***************************");
        console.log(data);
        console.log("***************************");
    }
};

let capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const Helpers = {
    OnConsole,
    capitalize,
};
