import { useState, useCallback } from "react";
import { api } from "../services/apiConfig";
//import storage from "../config/storage";

const useServices = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Only For Show Data use fetchData Function
    const fetchData = async (req) => {
        if (!req || typeof req !== "object" || !req.url || !req.method) {
            throw new Error("Invalid request object");
        }
        const { url, method, data } = req;
        setLoading(true);
        setError(null);
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            };
            const res = await api({ url, method, data, headers });

            setData(res.data.data);
        } catch (error) {
            setError(error);
            console.error("Error in fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    // Only For get data and post data and perform data manipulation operation in locally Function
    const postData = useCallback(async (req, contentType = "application/json") => {
        const { url, method, data } = req;
        setLoading(true);
        setError(null);
        try {
            const headers = {
                "Content-Type": contentType,
                Accept: "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            };
            const res = await api({ url, method, data, headers });

            return res.data;
        } catch (error) {
            setError(error);
            console.error("Error in posting data", error);
            return error.response ? error.response.data : { error: "Unknown error" };
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, data, fetchData, postData };
};

export default useServices;
