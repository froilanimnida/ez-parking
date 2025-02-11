import axiosInstance from "../axiosInstance";

const root = "/auth" as const;
export const loginUser = async (email: string) => {
    const result = await axiosInstance.post(`${root}/login`, {
        email: email,
    });
    if (result.status >= 400) return Promise.reject(result.data);
    console.log(result);
    return result;
};

export const verifyOTP = async (email: string, otp: string, rememberMe: boolean) => {
    const result = await axiosInstance.patch(`${root}/verify-otp`, {
        email: email,
        otp: otp,
        remember_me: rememberMe,
    });
    return result;
};

export const verifyEmail = async (code: string) => {
    const result = await axiosInstance.patch(`${root}/verify-email`, {
        verification_token: code,
    });
    return result;
};

export const verifyToken = async () => {
    const result = await axiosInstance.post(`${root}/verify-token`);
    return result;
};

export const protectedRoute = async () => {
    const result = await axiosInstance.post(`${root}/protected-route`);
    return result;
};
