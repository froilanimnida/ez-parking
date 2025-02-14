import * as SecureStore from "expo-secure-store";
import PlatformType from "./platform";
import axiosInstance from "./axiosInstance";
import { router } from "expo-router";

let authState: { loggedIn: boolean; role: string } | null = null;

export async function getAuthHeaders() {
    try {
        if (PlatformType() === "web") return;
        const access_token_cookie = await SecureStore.getItemAsync("access_token_cookie");
        const csrf_access_token = await SecureStore.getItemAsync("csrf_access_token");
        const csrf_refresh_token = await SecureStore.getItemAsync("csrf_refresh_token");
        const refresh_token_cookie = await SecureStore.getItemAsync("refresh_token_cookie");

        return {
            access_token_cookie: access_token_cookie ? `Bearer ${access_token_cookie}` : "",
            csrf_access_token: csrf_access_token || "",
            csrf_refresh_token: csrf_refresh_token || "",
            refresh_token_cookie: refresh_token_cookie || "",
        };
    } catch (error) {
        console.error("Error fetching auth headers:", error);
        return {};
    }
}

export async function isAuthenticated(): Promise<{ loggedIn: boolean; role: string }> {
    try {
        authState = null;

        if (PlatformType() === "web") {
            try {
                const response = await axiosInstance.post("/auth/verify-token");
                if (response.data?.role) {
                    authState = { loggedIn: true, role: response.data.role as string };
                    return authState;
                }
            } catch (error) {
                authState = { loggedIn: false, role: "" };
                return authState;
            }
        }

        // Mobile platform handling
        const authHeaders = await getAuthHeaders();
        if (!authHeaders?.access_token_cookie) {
            authState = { loggedIn: false, role: "" };
            return authState;
        }

        const response = await axiosInstance.post(
            "/auth/verify-token",
            {},
            {
                headers: authHeaders,
            }
        );

        if (response.data?.role) {
            authState = { loggedIn: true, role: response.data.role as string };
            return authState;
        }

        authState = { loggedIn: false, role: "" };
        return authState;
    } catch (error) {
        console.error("Auth check error:", error);
        authState = { loggedIn: false, role: "" };
        return authState;
    }
}

export async function logoutCurrentUser() {
    try {
        if (PlatformType() !== "web") {
            await SecureStore.deleteItemAsync("access_token_cookie");
            await SecureStore.deleteItemAsync("csrf_access_token");
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
