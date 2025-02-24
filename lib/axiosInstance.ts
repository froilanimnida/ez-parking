import axios, { type AxiosError, AxiosRequestHeaders } from "axios";
import PlatformType from "./helper/platform";
import getAuthHeaders, { setAuthHeaders } from "@lib/helper/getAuthHeaders";
import type ApiValidationError from "./models/validationError";
import type { SimplifiedValidationError } from "./models/validationError";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://ez-parking-system-pr-54.onrender.com/api/v1",
    // baseURL: "https://localhost:5000/api/v1",
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async (value) => {
        const authTokens = await getAuthHeaders();
        if (PlatformType() !== "web") {
            value.headers["access_token_cookie"] = authTokens.access_token_cookie;
            value.headers["csrf_access_token"] = authTokens.csrf_access_token;
            value.headers["refresh_token_cookie"] = authTokens.refresh_token_cookie;
            value.headers["csrf_refresh_token"] = authTokens.csrf_refresh_token;
            return value;
        }
        if (document.cookie) {
            value.headers["csrf_refresh_token"] = authTokens.csrf_refresh_token;
            value.headers["csrf_access_token"] = document.cookie.split("csrf_access_token=")[1].split(";")[0];
        }
        return value;
    },
    async (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.request.use(
    async (config) => {
        const authHeaders = await getAuthHeaders();
        config.headers = { ...config.headers, ...authHeaders } as AxiosRequestHeaders;
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }
        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    async (response) => {
        if (PlatformType() === "web") return response;
        if (PlatformType() !== "web") {
            const setCookieHeaders = response.headers["set-cookie"];
            if (setCookieHeaders && Array.isArray(setCookieHeaders)) {
                for (const cookieString of setCookieHeaders[0].split(",")) {
                    const trimmedCookie = cookieString.trim();
                    const cookieValue = trimmedCookie.split(";")[0];
                    const [key, value] = cookieValue.split("=");
                    if (key && value) {
                        try {
                            await setAuthHeaders(key, value);
                        } catch (err) {
                            console.error(`Failed to store cookie ${key}:`, err);
                        }
                    }
                }
            }
        }
        return response;
    },
    (error: AxiosError) => {
        if (error.response?.status === 422) {
            const apiError = error.response.data as ApiValidationError;
            const messages: string[] = [];
            if (apiError.errors?.json) {
                Object.entries(apiError.errors.json).forEach(([, categoryErrors]) => {
                    Object.entries(categoryErrors).forEach(([, fieldMessages]) => {
                        fieldMessages.forEach((message) => {
                            messages.push(message);
                        });
                    });
                });
            }

            const simplifiedError: SimplifiedValidationError = {
                name: "ValidationError",
                status: 422,
                messages,
                code: apiError.code,
            };

            return Promise.reject(simplifiedError);
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
