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

export async function storeCredentials(credentials: {
    authorization: string;
    authorizationExpires: string;
    csrfToken: string;
    csrfTokenExpires: string;
    csrfRefreshToken: string;
    csrfRefreshTokenExpires: string;
    refreshToken: string;
    refreshTokenExpires: string;
}) {
    try {
        await Promise.all([
            SecureStore.setItemAsync("Authorization", credentials.authorization),
            SecureStore.setItemAsync("AuthorizationExpires", credentials.authorizationExpires),
            SecureStore.setItemAsync("X-CSRF-TOKEN", credentials.csrfToken),
            SecureStore.setItemAsync("CSRFTokenExpires", credentials.csrfTokenExpires),
            SecureStore.setItemAsync("csrf_refresh_token", credentials.csrfRefreshToken),
            SecureStore.setItemAsync("CSRFRefreshTokenExpires", credentials.csrfRefreshTokenExpires),
            SecureStore.setItemAsync("refresh_token_cookie", credentials.refreshToken),
            SecureStore.setItemAsync("RefreshTokenExpires", credentials.refreshTokenExpires),
        ]);
    } catch (error) {
        console.error("Error storing credentials:", error);
    }
}
