import axiosInstance from "../axiosInstance";

const root = "/transaction" as const;

export const fetchTransactions = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`/establishment/${establishmentUuid}/transactions`);
    return result;
};

export const fetchUserTransactions = async () => {
    const result = await axiosInstance.get(`${root}/all`);
    return result.data;
};

export const viewTransaction = async (transactionUuid: string) => {
    const result = await axiosInstance.get(`${root}/view?transaction_uuid=${transactionUuid}`);
    return result;
};
