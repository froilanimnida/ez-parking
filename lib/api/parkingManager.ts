import axiosInstance from "../axiosInstance";
import type {
    ParkingAddressData,
    ParkingEstablishmentData,
    ParkingCompanyProfile,
    ParkingOwnerInformation,
    ParkingPaymentMethodData,
    ParkingOperatingHoursData,
} from "../models/parkingManagerSignUpTypes";

const root = "/parking-manager" as const;
export const qrContentOverview = async (qrContent: string) => {
    const result = await axiosInstance.get(`${root}/qr-content/overview?qr_content=${qrContent}`);
    return result;
};

export const getParkingSlotsParkingManager = async () => {
    const result = await axiosInstance.get(`${root}/slots`);
    return result;
};

export const getVehicleTypes = async () => {
    const result = await axiosInstance.get(`${root}/vehicle-types`);
    return result;
};

export const addParkingSlot = async (newSlotData: {
    slot_code: string;
    is_premium: boolean;
    floor_level: string;
    vehicle_type_id: number;
    slot_features: "standard" | "covered" | "vip" | "disabled" | "ev_charging";
    slot_status: "open" | "occupied" | "reserved" | "closed";
    is_active: boolean;
    base_price_per_hour: string;
    base_price_per_day: string;
    base_price_per_month: string;
    price_multiplier: string;
}) => {
    const result = await axiosInstance.post(`${root}/slot/create`, {
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
    return result;
};

export const parkingManagerSignUp = async (
    userInformation: ParkingOwnerInformation,
    companyProfile: ParkingCompanyProfile,
    addressData: ParkingAddressData,
    parkingEstablishmentData: ParkingEstablishmentData,
    operatingHours: { [key: string]: ParkingOperatingHoursData },
    paymentMethodData: ParkingPaymentMethodData
) => {
    const result = await axiosInstance.post(`${root}/signup`, {
        user: userInformation,
        company_profile: companyProfile,
        address: addressData,
        parking_establishment: parkingEstablishmentData,
        operating_hour: operatingHours,
        payment_method: paymentMethodData,
    });
    return result;
};
