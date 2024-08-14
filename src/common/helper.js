import { Dependencies } from "../packages/index.js";
import { config } from "../common/config.js";

let OnConsole = (message, data) => {
    console.log(message);
    if (data) {
        console.log("****************************************************************");
        console.log(data);
        console.log("****************************************************************");
    }
};

let errorReporter = async (data) => {
    try {
        let postThisData = {
            url: config.frontendDomain,
            body: JSON.stringify({ flockml: data }),
            headers: { "Content-Type": "application/json" },
        };
        Dependencies.request.post(postThisData, (err, res, body) => {
            if (err) {
                console.log(err);
            } else {
                console.log(body);
            }
        });
    } catch (error) {
        OnConsole("Error inside errorReporter", error);
    }
};

let capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const Helpers = {
    OnConsole,
    errorReporter,
    capitalize,
};
