import axiosInstance from "@lib/axiosInstance";

const root = "/reports" as const;

export const occupancyReport = async () => {
    return await axiosInstance.get(`${root}/occupancy`);
};

export const revenueReport = async () => {
    return await axiosInstance.get(`${root}/revenue`);
};

export const peakHoursReport = async () => {
    return await axiosInstance.get(`${root}/peak-hours`);
};

export const vehicleDistributionReport = async () => {
    return await axiosInstance.get(`${root}/vehicle-dist`);
};

export const durationStatsReport = async () => {
    return await axiosInstance.get(`${root}/duration-stats`);
};

export const utilizationReport = async () => {
    return await axiosInstance.get(`${root}/utilization`);
};

export const premiumAnalysisReport = async () => {
    return await axiosInstance.get(`${root}/premium-analysis`);
};

export const trendAnalysisReport = async () => {
    return await axiosInstance.get(`${root}/trends`);
};

export const paymentStatsReport = async () => {
    return await axiosInstance.get(`${root}/payment-stats`);
};
