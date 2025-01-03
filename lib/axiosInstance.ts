import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
});

if (__DEV__) {
    axios.defaults.validateStatus = (status) => true;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

axiosInstance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
});

export default axiosInstance;
