import axiosInstance from "../axiosInstance";

const root = "/auth" as const;
export const loginUser = async (email: string) => {
    return await axiosInstance.post(`${root}/login`, {
        email: email,
    });
};

export const verifyOTP = async (email: string, otp: string, rememberMe: boolean) => {
    return await axiosInstance.patch(`${root}/verify-otp`, {
        email: email,
        otp: otp,
        remember_me: rememberMe,
    });
};

export const verifyEmail = async (code: string) => {
    return await axiosInstance.patch(`${root}/verify-email`, {
        verification_token: code,
    });
};

export const verifyToken = async () => {
    return await axiosInstance.post(`${root}/verify-token`);
};

export const protectedRoute = async () => {
    return await axiosInstance.post(`${root}/protected-route`);
};

export const refreshToken = async () => {
    return await axiosInstance.post(`${root}/refresh-token`);
};
