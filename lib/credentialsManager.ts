import * as SecureStore from "expo-secure-store";
import PlatformType from "./helper/platform";
import axiosInstance from "./axiosInstance";
import { router } from "expo-router";
import getAuthHeaders from "@lib/helper/getAuthHeaders";

let authState: { loggedIn: boolean; role: string } | null = null;

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
                console.error("Auth check error:" + error);
                // if (error.response.data.msg === "Token has expired") {
                //     console.log("Trying to refresh token");
                //     authState = { loggedIn: false, role: "" };
                //     try {
                //         const result = await refreshToken();
                //         console.log(result);
                //         if (result) {
                //             if (result.data?.role) {
                //                 authState = { loggedIn: true, role: result.data.role as string };
                //                 return authState;
                //             }
                //         }
                //     } catch {
                //         return authState;
                //     }
                //     const result = refreshToken();
                //     console.log(result);
                // }
                authState = { loggedIn: false, role: "" };
                return authState;
            }
        }

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
            },
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
