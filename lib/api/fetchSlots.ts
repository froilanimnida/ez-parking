import axiosInstance from "../axiosInstance";

export const fetchEstablishmentData = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`/establishment/view?establishment_uuid=${establishmentUuid}`);
    return result;
};

export const fetchSlots = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`/establishment/slots?establishment_uuid=${establishmentUuid}`);
    return result;
}
