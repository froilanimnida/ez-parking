import PlatformType from "@lib/helper/platform";
import * as SecureStore from "expo-secure-store";

export default async function getAuthHeaders() {
    try {
        if (PlatformType() === "web") {
            if (document.cookie.includes("csrf_access_token=") && document.cookie.includes("csrf_refresh_token=")) {
                return {
                    csrf_access_token: document.cookie.split("csrf_access_token=")[1]?.split(";")[0] || null,
                    csrf_refresh_token: document.cookie.split("csrf_refresh_token=")[1]?.split(";")[0] || null,
                };
            }
            return {};
        }
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

export async function setAuthHeaders(key: string, value: string) {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error("Error setting auth headers:", error);
    }
}
