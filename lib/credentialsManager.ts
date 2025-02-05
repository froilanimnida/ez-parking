import * as SecureStore from "expo-secure-store";
import PlatformType from "./platform";
import axiosInstance from "./axiosInstance";
import { router } from "expo-router";

const PLATFORM = PlatformType();

export async function getAuthHeaders() {
    try {
        if (PLATFORM === "web") {
            const xsrfToken = document.cookie.split(";").find((cookie) => cookie.includes("X-CSRF-TOKEN"));
            const csrfRefreshToken = document.cookie.split(";").find((cookie) => cookie.includes("csrf_refresh_token"));
            return {
                "X-CSRF-TOKEN": xsrfToken || "",
                csrf_refresh_token: csrfRefreshToken || "",
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
        return {};
    }
}

export async function isAuthenticated() {
    try {
        const authHeaders = await getAuthHeaders();
        if (!authHeaders.Authorization) {
            router.replace("/auth/login");
            return false;
        }

        const response = await axiosInstance.post("/auth/verify-token", {}, { headers: authHeaders });
        if (response.data?.role) {
            return true;
        }
        router.replace("/auth/login");
        return false;
    } catch (error) {
        router.replace("/auth/login");
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
