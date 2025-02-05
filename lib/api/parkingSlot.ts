import axiosInstance from "../axiosInstance";
import type { ParkingSlot } from "../models/parking-slot";

const parkingSlotRoot = "/slot" as const;

// export const createParkingSlot = async (newSlotData: ParkingSlot, establishmentId: number) => {
//     const result = await axiosInstance.post(`${parkingSlotRoot}/create`, {
//         establishment_uuid: newSlotData.establishment_uuid,
//         slot_number: newSlotData.slot_number,
//         is_occupied: newSlotData.is_occupied,
//         vehicle_type_id: newSlotData.vehicle_type_id,
//     });
//     return result.data;
// };
