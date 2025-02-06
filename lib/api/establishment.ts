import axiosInstance from "../axiosInstance";

const root = "/establishment" as const;

export const fetchEstablishmentInfo = async (establishmentUuid: string) => {
    const result = await axiosInstance.get(`${root}/view?establishment_uuid=${establishmentUuid}`);
    return result;
};

export const getNearbyEstablishments = async (latitude: number, longitude: number) => {
    const result = await axiosInstance.get(`${root}/query?user_latitude=${latitude}&longitude=${longitude}`);
    return result;
};
