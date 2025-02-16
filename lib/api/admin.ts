import axiosInstance from "../axiosInstance";

const root = "/admin" as const;

export const banUser = async (userId: number) => {
    const result = await axiosInstance.post(`${root}/ban-user`, {
        user_id: userId,
    });
    return result;
};

export const unbanUser = async (userId: number) => {
    const result = await axiosInstance.post(`${root}/unban-user`, {
        user_id: userId,
    });
    return result;
};

export const getBannedUsers = async () => {
    const result = await axiosInstance.get(`${root}/get-banned-users`);
    return result;
};

export const getVehicleTypes = async () => {
    const result = await axiosInstance.get(`${root}/vehicle-types`);
    return result;
};

export const getEstablishments = async () => {
    const result = await axiosInstance.get(`${root}/establishments`);
    return result;
};

export const getEstablishment = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`${root}/establishment/${establishmentUuid}`);
    return result;
};

export const getAllUsers = async () => {
    const result = await axiosInstance.get(`${root}/users`);
    return result;
};
