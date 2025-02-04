import axiosInstance from "../axiosInstance";

export const fetchUsers = async () => {
    const result = await axiosInstance.get(`/admin/users`);
    return result;
};
