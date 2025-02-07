import axiosInstance from "../axiosInstance";
import type { ParkingSlot } from "../models/parking-slot";

const parkingSlotRoot = "/slot" as const;

export const createParkingSlot = async (newSlotData: ParkingSlot, establishmentId: number) => {
    const result = await axiosInstance.post(`${parkingSlotRoot}/create`, {
        // establishment_uuid: newSlotData.establishment_uuid,
        slot_code: newSlotData.slot_code,
        is_premium: newSlotData.is_premium,
        vehicle_type_id: newSlotData.vehicle_type_id,
        floor_level: newSlotData.floor_level,
        slot_features: newSlotData.slot_features,
        base_price_per_hour: newSlotData.base_price_per_hour,
        base_price_per_day: newSlotData.base_price_per_day,
        base_price_per_month: newSlotData.base_price_per_month,
        price_multiplier: newSlotData.price_multiplier,
        is_active: newSlotData.is_active,
    });
    return result.data as { success: boolean; message: string };
};

export const getParkingSlotsParkingManager = async () => {
    const result = await axiosInstance.get(`${parkingSlotRoot}/all`);
    return result.data.slots as ParkingSlot[];
};
