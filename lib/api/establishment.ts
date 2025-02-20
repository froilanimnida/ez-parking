import axiosInstance from "../axiosInstance";

const root = "/establishment" as const;

export const fetchEstablishmentInfo = async (establishmentUuid: string) =>
    await axiosInstance.get(`${root}/view?establishment_uuid=${establishmentUuid}`);

export const searchEstablishments = async (latitude: number, longitude: number, searchTerm: string, city: string) =>
    await axiosInstance.get(
        `${root}/query?user_latitude=${latitude}&user_longitude=${longitude}&search_term=${searchTerm}&city=${city}`,
    );

export const getDocument = async (bucket_path: string) =>
    await axiosInstance.get(`${root}/document?bucket_path=${bucket_path}`);
