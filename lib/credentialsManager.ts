import * as SecureStore from "expo-secure-store";

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

export async function storeAuthorization(authorization: string) {
    try {
        await SecureStore.setItemAsync("Authorization", authorization);
    } catch (error) {
        console.error("Error storing authorization:", error);
    }
}

export async function storeCSRFToken(csrfToken: string) {
    try {
        await SecureStore.setItemAsync("X-CSRF-TOKEN", csrfToken);
    } catch (error) {
        console.error("Error storing CSRF token:", error);
    }
}

export async function storeCSRFRefreshToken(csrfRefreshToken: string) {
    try {
        await SecureStore.setItemAsync("csrf_refresh_token", csrfRefreshToken);
    } catch (error) {
        console.error("Error storing CSRF refresh token:", error);
    }
}

export async function storeRefreshToken(refreshToken: string) {
    try {
        await SecureStore.setItemAsync("refresh_token_cookie", refreshToken);
    } catch (error) {
        console.error("Error storing refresh token:", error);
    }
}
