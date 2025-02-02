import * as SecureStore from "expo-secure-store";
import PlatformType from "./platform";
import axiosInstance from "./axiosInstance";
import { router } from "expo-router";

export async function getAuthHeaders() {
    try {
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
        console.error("Error retrieving credentials:", error);
        return {};
    }
}

export async function logoutCurrentUser() {
    try {
        if (PlatformType() !== "web") {
            axiosInstance.post("/auth/logout");
            await SecureStore.deleteItemAsync("Authorization");
            await SecureStore.deleteItemAsync("X-CSRF-TOKEN");
            await SecureStore.deleteItemAsync("csrf_refresh_token");
            await SecureStore.deleteItemAsync("refresh_token_cookie");
        } else {
            axiosInstance.post("/auth/logout");
        }
        router.replace("/auth/login");
    } catch (error) {
        console.error("Error logging out:", error);
    }
}
