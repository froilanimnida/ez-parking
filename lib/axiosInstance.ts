import axios from "axios";
import * as SecureStore from "expo-secure-store";
import PlatformType from "./platform";

const PLATFORM = PlatformType();

type UserRole = "user" | "parking_manager" | "admin";

const ROLE_ROUTES: Record<string, UserRole[]> = {
    "/parking-manager": ["parking_manager"],
    "/admin": ["admin"],
    "/user": ["user"],
};

async function verifyAndGetRole(
    authToken: string | undefined | undefined,
    xsrfToken: string | undefined | undefined,
    csrf_refresh_token: string | undefined | undefined,
    refresh_token_cookie: string | undefined | undefined
): Promise<UserRole | null> {
    if (!authToken) return null;
    try {
        const result = await axiosInstance.post(
            `${process.env.EXPO_PUBLIC_API_AUTH_ROOT}/verify-token`,
            {},
            {
                headers: {
                    Authorization: authToken,
                    "X-CSRF-TOKEN": xsrfToken || "",
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

function getRedirectPath(role: UserRole): string {
    switch (role) {
        case "admin":
            return "/admin/dashboard";
        case "parking_manager":
            return "/parking-manager/dashboard";
        case "user":
            return "/user/dashboard";
        default:
            return "/";
    }
}

function matchesPattern(path: string, pattern: string): boolean {
    const normalizedPath = path.replace(/\/$/, "");
    const regexPattern = pattern.replace(/\*/g, ".*").replace(/\//g, "\\/").replace(/\/$/, "");
    const regex = new RegExp(`^${regexPattern}`);
    return regex.test(normalizedPath);
}

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async (value) => {
        const requestUrl = value.url;
        // const router = useRouter();
        console.log(value);
        console.log("Request Origin URL: ", value.url);
        if (requestUrl?.endsWith("/login")) {
            // const userRole = await verifyAndGetRole(authToken, xsrfToken, csrf_refresh_token, refresh_token_cookie);
            // if (userRole) {
            //         router.replace(getRedirectPath(userRole));
            // }
            if (PlatformType() !== "web") {
                const authToken = await SecureStore.getItemAsync("Authorization");
                const xsrfToken = await SecureStore.getItemAsync("X-CSRF-TOKEN");
                const csrf_refresh_token = await SecureStore.getItemAsync("csrf_refresh_token");
                const refresh_token_cookie = await SecureStore.getItemAsync("refresh_token_cookie");
                const userRole = await verifyAndGetRole(authToken, xsrfToken, csrf_refresh_token, refresh_token_cookie);
                if (userRole) {
                    value.url = getRedirectPath(userRole);
                }
            }
            return value;
        }
        return value;
    },
    (error) => {}
);

if (__DEV__) {
    axios.defaults.validateStatus = (status) => true;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

axiosInstance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
});

export default axiosInstance;
