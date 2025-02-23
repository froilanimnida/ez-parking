import axiosInstance from "@lib/axiosInstance";

const root = "/reports" as const;

export const occupancyReport = async () => {
    return await axiosInstance.get(`${root}/occupancy`);
};

export const revenueReport = async (start_date?: Date | undefined, end_date?: Date | undefined) => {
    if (start_date !== undefined && end_date !== undefined) {
        return await axiosInstance.get(
            `${root}/revenue?start_date=${start_date.toISOString().split("T")[0]}&end_date=${end_date.toISOString().split("T")[0]}`,
        );
    }
    return await axiosInstance.get(`${root}/revenue`);
};

export const peakHoursReport = async () => {
    return await axiosInstance.get(`${root}/peak-hours`);
};

export const vehicleDistributionReport = async (start_date?: Date | undefined, end_date?: Date | undefined) => {
    if (start_date !== undefined && end_date !== undefined) {
        return await axiosInstance.get(
            `${root}/vehicle-dist?start_date=${start_date.toISOString().split("T")[0]}&end_date=${end_date.toISOString().split("T")[0]}`,
        );
    }
    return await axiosInstance.get(`${root}/vehicle-dist`);
};

export const durationStatsReport = async (start_date?: Date | undefined, end_date?: Date | undefined) => {
    if (start_date !== undefined && end_date !== undefined) {
        return await axiosInstance.get(
            `${root}/duration-stats?start_date=${start_date.toISOString().split("T")[0]}&end_date=${end_date.toISOString().split("T")[0]}`,
        );
    }
    return await axiosInstance.get(`${root}/duration-stats`);
};

export const utilizationReport = async (start_date?: Date | undefined, end_date?: Date | undefined) => {
    if (start_date !== undefined && end_date !== undefined) {
        return await axiosInstance.get(
            `${root}/utilization?start_date=${start_date.toISOString().split("T")[0]}&end_date=${end_date.toISOString().split("T")[0]}`,
        );
    }
    return await axiosInstance.get(`${root}/utilization`);
};

export const premiumAnalysisReport = async (start_date?: Date | undefined, end_date?: Date | undefined) => {
    if (start_date !== undefined && end_date !== undefined) {
        return await axiosInstance.get(
            `${root}/premium-analysis?start_date=${start_date.toISOString().split("T")[0]}&end_date=${end_date.toISOString().split("T")[0]}`,
        );
    }
    return await axiosInstance.get(`${root}/premium-analysis`);
};

export const trendAnalysisReport = async () => {
    return await axiosInstance.get(`${root}/trends`);
};

export const paymentStatsReport = async (start_date?: Date | undefined, end_date?: Date | undefined) => {
    if (start_date !== undefined && end_date !== undefined) {
        return await axiosInstance.get(
            `${root}/payment-stats?start_date=${start_date.toISOString().split("T")[0]}&end_date=${end_date.toISOString().split("T")[0]}`,
        );
    }
    return await axiosInstance.get(`${root}/payment-stats`);
};
