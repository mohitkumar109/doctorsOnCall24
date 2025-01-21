import axios from "axios";
import { toast } from "react-hot-toast";
import { getEnvironment } from "../utils/environments";
import { getToken } from "../utils/storage";

const { BASE_URL } = getEnvironment();

class BaseAPI {
    //Handle API Request
    async makeRequest(req, contentType = "application/json") {
        const { url, method, data } = req;
        try {
            const res = await axios({
                url: BASE_URL + url,
                method: method,
                data: data,
                headers: {
                    "Content-Type": contentType,
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return res.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    //Handle API Error
    async handleError(error) {
        const { response } = error;
        if (response) {
            const { statusCode, message } = response.data || {};

            const errorMessage = {
                401: "Unauthorized",
                412: "Validation Error",
                400: message || "Bad Request",
                404: "Not Found",
                428: "Step Error",
                500: "Internal Server Error",
            };

            switch (statusCode) {
                case 401:
                    window.location.href = "/logout";
                    break;

                default:
                    this.showError(errorMessage[statusCode] || message || "An Error occurred");
            }
        } else {
            toast.error(error.message || "An unexpected error occurred");
            if (error?.code === "ERR_CANCELED") window.location.href = "/logout";
            console.error("Request setup error:", error);
        }
    }
    showError(text) {
        toast.error(text);
    }
}

export default BaseAPI;
