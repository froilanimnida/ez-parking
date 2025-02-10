import axiosInstance from "../axiosInstance";

const root = "/parking-manager" as const;
export const qrContentOverview = async (qrContent: string) => {
    const result = await axiosInstance.get(`${root}/qr-content/overview?qr_content=${qrContent}`);
    return result;
};

export const getAllSlots = async () => {
    const result = await axiosInstance.get(`${root}/slots`);
    return result;
};
