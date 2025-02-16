import axiosInstance from "../axiosInstance";

const root = "/establishment" as const;

export const fetchEstablishmentInfo = async (establishmentUuid: string) =>
    await axiosInstance.get(`${root}/view?establishment_uuid=${establishmentUuid}`);

export const getNearbyEstablishments = async (latitude: number, longitude: number) =>
    await axiosInstance.get(`${root}/query?user_latitude=${latitude}&user_longitude=${longitude}`);
