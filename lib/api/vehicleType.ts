import axiosInstance from "../axiosInstance";
import type { VehicleType } from "../models/vehicle-types";

const vehicleTypeRoot = "/vehicle_type" as const;

export const createVehicleType = async (newVehicleData: VehicleType) => {
    const result = await axiosInstance.post(`${vehicleTypeRoot}/create`, {
        size_category: newVehicleData.size_category,
        name: newVehicleData.name,
        code: newVehicleData.code,
        is_active: newVehicleData.is_active,
        description: newVehicleData.description,
    });
    return result.data;
};

export const getAllVehicleTypes = async () => {
    const result = await axiosInstance.get(`${vehicleTypeRoot}/all`);
    return result.data as VehicleType[];
};

export const updateVehicleType = async (vehicleTypeId: number, updatedVehicleData: VehicleType) => {
    const result = await axiosInstance.put(`${vehicleTypeRoot}/update`, {
        vehicle_type_id: vehicleTypeId,
        size_category: updatedVehicleData.size_category,
        name: updatedVehicleData.name,
        code: updatedVehicleData.code,
        is_active: updatedVehicleData.is_active,
        description: updatedVehicleData.description,
    });
    return result.data;
};
