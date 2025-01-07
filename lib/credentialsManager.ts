import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function getCookies() {
    const Authorization = AsyncStorage.getItem("Authorization");
    const XCSRFTOKEN = AsyncStorage.getItem("X-CSRF-TOKEN");
    const csrf_refresh_token = AsyncStorage.getItem("csrf_refresh_token");
    const refresh_token_cookie = AsyncStorage.getItem("refresh_token_cookie");
    const AuthorizationExpires = AsyncStorage.getItem("AuthorizationExpires");
    const CSRFTokenExpires = AsyncStorage.getItem("CSRFTokenExpires");
    const CSRFRefreshTokenExpires = AsyncStorage.getItem("CSRFRefreshTokenExpires");
    const RefreshTokenExpires = AsyncStorage.getItem("RefreshTokenExpires");
    return {
        Authorization: `Bearer ${Authorization}`,
        "X-CSRF-TOKEN": XCSRFTOKEN,
        csrf_refresh_token,
        refresh_token_cookie,
        AuthorizationExpires,
        CSRFTokenExpires,
        CSRFRefreshTokenExpires,
        RefreshTokenExpires,
    };
}

export function storeCookies(
    authorization: string,
    authorizationExpires: string,
    csrf_token: string,
    csrfTokenExpires: string,
    csrf_refresh_token: string,
    csrfRefreshTokenExpires: string,
    refresh_token: string,
    refreshTokenExpires: string
) {
    AsyncStorage.setItem("Authorization", authorization);
    AsyncStorage.setItem("AuthorizationExpires", authorizationExpires);
    AsyncStorage.setItem("X-CSRF-TOKEN", csrf_token);
    AsyncStorage.setItem("CSRFTokenExpires", csrfTokenExpires);
    AsyncStorage.setItem("csrf_refresh_token", csrf_refresh_token);
    AsyncStorage.setItem("CSRFRefreshTokenExpires", csrfRefreshTokenExpires);
    AsyncStorage.setItem("refresh_token_cookie", refresh_token);
    AsyncStorage.setItem("RefreshTokenExpires", refreshTokenExpires);
}
