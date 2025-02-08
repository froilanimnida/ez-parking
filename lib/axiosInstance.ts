import axios from "axios";
import * as SecureStore from "expo-secure-store";
import PlatformType from "./platform";
import Constants from "expo-constants";
import { router } from "expo-router";
import { getAuthHeaders } from "./credentialsManager";
type UserRole = "user" | "parking_manager" | "admin";

async function verifyAndGetRole(
    authToken: string | undefined | null,
    xsrfToken: string | undefined | null,
    csrf_refresh_token: string | undefined | null,
    refresh_token_cookie: string | undefined | null
): Promise<UserRole | null> {
    console.log("Verifying role with auth token:", authToken);
    if (!authToken) return null;
    try {
        const result = await axiosInstance.post(
            `/auth/verify-token`,
            {},
            {
                headers: {
                    Authorization: authToken,
                    "X-CSRF-TOKEN": xsrfToken || "",
                    refresh_token_cookie: refresh_token_cookie || "",
                    csrf_refresh_token: csrf_refresh_token || "",
                },
            }
        );
        return result.data.role as UserRole;
    } catch {
        return null;
    }
}

function getRedirectPath(role: UserRole): string {
    switch (role) {
        case "admin":
            return "/admin/dashboard";
        case "parking_manager":
            return "/parking-manager/dashboard";
        case "user":
            return "/user/dashboard";
        default:
            return "/";
    }
}

const API_BASE_URL = __DEV__
    ? process.env.EXPO_PUBLIC_API_BASE_URL
    : Constants.expoConfig?.extra?.apiBaseUrl || "https://ez-parking-system.onrender.com/api/v1";

const axiosInstance = axios.create({
    withCredentials: true,
    // baseURL: API_BASE_URL,
    baseURL: "https://ez-parking-system-pr-54.onrender.com/api/v1",
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async (value) => {
        const requestUrl = value.url;
        if (requestUrl?.endsWith("/login")) {
            if (PlatformType() !== "web") {
                const authToken = await SecureStore.getItemAsync("Authorization");
                const xsrfToken = await SecureStore.getItemAsync("X-CSRF-TOKEN");
                const csrf_refresh_token = await SecureStore.getItemAsync("csrf_refresh_token");
                const refresh_token_cookie = await SecureStore.getItemAsync("refresh_token_cookie");

                const userRole = await verifyAndGetRole(authToken, xsrfToken, csrf_refresh_token, refresh_token_cookie);
                if (userRole) {
                    value.url = getRedirectPath(userRole);
                }
            }
            return value;
        } else if (
            requestUrl?.endsWith("/admin") ||
            requestUrl?.endsWith("/user") ||
            requestUrl?.endsWith("/parking-manager")
        ) {
            if (PlatformType() !== "web") {
                const authToken = await SecureStore.getItemAsync("Authorization");
                const xsrfToken = await SecureStore.getItemAsync("X-CSRF-TOKEN");
                const csrf_refresh_token = await SecureStore.getItemAsync("csrf_refresh_token");
                const refresh_token_cookie = await SecureStore.getItemAsync("refresh_token_cookie");
                const userRole = await verifyAndGetRole(authToken, xsrfToken, csrf_refresh_token, refresh_token_cookie);
                if (!userRole) {
                    value.url = "/login";
                }
            }
            return value;
        }
        return value;
    },
    (error) => {}
);

axiosInstance.interceptors.request.use(
    async (config) => {
        const authHeaders = await getAuthHeaders();
        config.headers = { ...config.headers, ...authHeaders };
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            router.replace("./auth/login");
        }
        return Promise.reject(error);
    }
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
                            await SecureStore.setItemAsync(key, value);
                        } catch (err) {
                            console.error(`Failed to store cookie ${key}:`, err);
                        }
                    }
                }
            }
        }
        return response;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
