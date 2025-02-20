import axiosInstance from "../axiosInstance";

const root = "/admin" as const;

export const banUser = async (userId: number) => {
    return await axiosInstance.post(`${root}/ban-user`, {
        user_id: userId,
    });
};

export const unbanUser = async (userId: number) => {
    return await axiosInstance.post(`${root}/unban-user`, {
        user_id: userId,
    });
};

export const getBannedUsers = async () => {
    return await axiosInstance.get(`${root}/get-banned-users`);
};

export const getVehicleTypes = async () => {
    return await axiosInstance.get(`${root}/vehicle-types`);
};

export const getEstablishments = async () => {
    return await axiosInstance.get(`${root}/establishments`);
};

export const getEstablishment = async (establishmentUuid: string) => {
    return await axiosInstance.get(`${root}/establishment?establishment_uuid=${establishmentUuid}`);
};

export const getAllUsers = async () => {
    return await axiosInstance.get(`${root}/users`);
};
