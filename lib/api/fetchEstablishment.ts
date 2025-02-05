import axiosInstance from "../axiosInstance";



export const fetchEstablishmentInfo = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`/establishment/${establishmentUuid}`);
    return result;
};
