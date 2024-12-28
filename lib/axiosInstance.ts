import axios from "axios";
import https from "https";

export const httpsAgent = new https.Agent({
    rejectUnauthorized: process.env.ENVIRONMENT === "production",
});

const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
    httpsAgent,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
});

export default axiosInstance;
