import axiosInstance from "../axiosInstance";

export const fetchTransactions = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`/establishment/${establishmentUuid}/transactions`);
    return result;
};

export const fetchUserTransactions = async () => {
    const result = await axiosInstance.get(`/transactions`);
    return result;
};
