import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";
const option = {
    baseURL: BASE_URL, // Set your base URL here
    //withCredentials: true, // This allows cookies to be sent with the request
};

// Create an axios instance
const api = axios.create(option);

export { BASE_URL, api };
