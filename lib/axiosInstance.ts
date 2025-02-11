import axios from "axios";
import * as SecureStore from "expo-secure-store";
import PlatformType from "./platform";
import { router, type RelativePathString } from "expo-router";
import { getAuthHeaders } from "./credentialsManager";
export type UserRole = "user" | "parking_manager" | "admin";

async function verifyAndGetRole(
    authToken: string | undefined | null,
    xsrfToken: string | undefined | null,
    csrf_refresh_token: string | undefined | null,
    refresh_token_cookie: string | undefined | null
): Promise<UserRole | null> {
    if (!authToken) return null;
    try {
        const result = await axiosInstance.post(
            `/auth/verify-token`,
            {},
            {
                headers: {
                    access_token_cookie: authToken,
                    csrf_access_token: xsrfToken || "",
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

export function getRedirectPath(role: UserRole): RelativePathString {
    switch (role) {
        case "admin":
            return "/admin" as RelativePathString;
        case "parking_manager":
            return "/parking-manager" as RelativePathString;
        case "user":
            return "/user" as RelativePathString;
        default:
            return "/" as RelativePathString;
    }
}

const axiosInstance = axios.create({
    withCredentials: true,
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
                const access_token_cookie = await SecureStore.getItemAsync("access_token_cookie");
                const csrf_access_token = await SecureStore.getItemAsync("csrf_access_token");
                const csrf_refresh_token = await SecureStore.getItemAsync("csrf_refresh_token");
                const refresh_token_cookie = await SecureStore.getItemAsync("refresh_token_cookie");
                const userRole = await verifyAndGetRole(
                    access_token_cookie,
                    csrf_access_token,
                    csrf_refresh_token,
                    refresh_token_cookie
                );
                if (userRole) {
                    value.url = getRedirectPath(userRole);
                }
            }
            return value;
        }
        return value;
    },
    async (error) => {
        if (error.response?.status === 401) {
            router.replace("/auth/login");
        }
        return Promise.reject(error);
    }
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
    (error) => {
        if (error.status === 401) {
            router.replace("/auth/login");
        }
        Promise.reject(error);
    }
);

export default axiosInstance;
