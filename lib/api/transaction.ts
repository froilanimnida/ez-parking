import axiosInstance from "../axiosInstance";

export const fetchTransactions = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`/establishment/${establishmentUuid}/transactions`);
    return result;
};

export const fetchUserTransactions = async () => {
    const result = await axiosInstance.get(`/transactions/all`);
    return result;
}


export const viewTransaction = async (transactionUuid: string) => {
    const result = await axiosInstance.get(`/transaction/view?transaction_uuid=${transactionUuid}`);
    return result;
}
