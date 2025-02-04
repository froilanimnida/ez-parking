import axiosInstance from "../axiosInstance";

export const fetchSlots = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`/establishment/${establishmentUuid}/slots`);
    return result;
};
