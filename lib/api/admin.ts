import axiosInstance from "../axiosInstance";

export const banUser = async (userId: number) => {
    const result = await axiosInstance.post(`/admin/ban-user`, {
        user_id: userId,
    });
    return result;
};

export const unbanUser = async (userId: number) => {
    const result = await axiosInstance.post(`/admin/unban-user`, {
        user_id: userId,
    });
    return result;
};

export const getBannedUsers = async () => {
    const result = await axiosInstance.get(`/admin/get-banned-users`);
    return result;
};

export const getVehicleTypes = async () => {
    const result = await axiosInstance.get(`/admin/vehicle-types`);
    return result;
};

export const getEstablishments = async () => {
    const result = await axiosInstance.get(`/admin/establishments`);
    return result;
};

export const getEstablishment = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`/admin/establishment/${establishmentUuid}`);
    return result;
};
