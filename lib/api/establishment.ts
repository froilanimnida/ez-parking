import axiosInstance from "../axiosInstance";

const root = "/establishment" as const;

export const fetchEstablishmentInfo = async (establishmentUuid: string) =>
    await axiosInstance.get(`${root}/view?establishment_uuid=${establishmentUuid}`);

export const searchEstablishments = async (
    latitude?: number,
    longitude?: number,
    searchTerm?: string,
    city?: string,
) => {
    const params = new URLSearchParams();

    if (latitude !== undefined) params.append("user_latitude", latitude.toString());
    if (longitude !== undefined) params.append("user_longitude", longitude.toString());
    if (searchTerm) params.append("search_term", searchTerm);
    if (city) params.append("city", city);

    return await axiosInstance.get(`${root}/query?${params.toString()}`);
};

export const getDocument = async (bucket_path: string) =>
    await axiosInstance.get(`${root}/document?bucket_path=${bucket_path}`);
