import * as SecureStore from "expo-secure-store";
import PlatformType from "./platform";
import axiosInstance from "./axiosInstance";
import { router } from "expo-router";

const PLATFORM = PlatformType();

function getCookieValue(cookieName: string) {
    return (
        document.cookie
            .split("; ")
            .find((row) => row.startsWith(cookieName + "="))
            ?.split("=")[1] || ""
    );
}

export async function getAuthHeaders() {
    try {
        if (PLATFORM === "web") {
            const xsrfToken = getCookieValue("X-CSRF-TOKEN");
            const csrfRefreshToken = getCookieValue("csrf_refresh_token");

            console.log("xsrfToken:", xsrfToken);
            console.log("csrfRefreshToken:", csrfRefreshToken);

            return {
                "X-CSRF-TOKEN": xsrfToken,
                csrf_refresh_token: csrfRefreshToken,
            };
        }

        const authorization = await SecureStore.getItemAsync("Authorization");
        const xsrfToken = await SecureStore.getItemAsync("X-CSRF-TOKEN");
        const csrfRefreshToken = await SecureStore.getItemAsync("csrf_refresh_token");
        const refreshToken = await SecureStore.getItemAsync("refresh_token_cookie");

        return {
            Authorization: authorization ? `Bearer ${authorization}` : "",
            "X-CSRF-TOKEN": xsrfToken || "",
            csrf_refresh_token: csrfRefreshToken || "",
            refresh_token_cookie: refreshToken || "",
        };
    } catch (error) {
        console.error("Error fetching auth headers:", error);
        return {};
    }
}

export async function isAuthenticated() {
    try {
        const authHeaders = await getAuthHeaders();
        if (!authHeaders.Authorization) {
            return false;
        }

        const response = await axiosInstance.post("/auth/verify-token", {}, { headers: authHeaders });
        if (response.data?.role) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export async function logoutCurrentUser() {
    try {
        if (PlatformType() !== "web") {
            await SecureStore.deleteItemAsync("Authorization");
            await SecureStore.deleteItemAsync("X-CSRF-TOKEN");
            await SecureStore.deleteItemAsync("csrf_refresh_token");
            await SecureStore.deleteItemAsync("refresh_token_cookie");
        }
        await axiosInstance.post("/auth/logout");
    } catch (error) {
        console.error("Error logging out:", error);
    } finally {
        router.replace("/auth/login");
    }
}
