import axiosInstance from "../axiosInstance";
import type { OperatingHours } from "../function/validators/scheduleValidator";
import type {
    ParkingAddressData,
    ParkingEstablishmentData,
    ParkingCompanyProfile,
    ParkingOwnerInformation,
    ParkingPaymentMethodData,
    ParkingOperatingHoursData,
} from "../models/parkingManagerSignUpTypes";
import type { Documents } from "../types/documents";
import { OperatingHour } from "@lib/models/operatingHour";
import { DAYS_OF_WEEK } from "@lib/types/models/common/constants";

const root = "/parking-manager" as const;
export const qrContentOverview = async (qrContent: string) => {
    return await axiosInstance.get(`${root}/qr-content/overview?qr_content=${qrContent}`);
};

export const allowTransaction = async (qrContent: string, paymentStatus: "pending" | "paid") =>
    await axiosInstance.patch(`${root}/validate/entry`, {
        qr_content: qrContent,
        payment_status: paymentStatus,
    });

export const allowExit = async (
    transactionId: string,
    paymentStatus: "pending" | "paid",
    exitTime: string,
    amount_due: number,
    slotId: number,
) => {
    return await axiosInstance.patch(`${root}/validate/exit`, {
        qr_content: transactionId,
        payment_status: paymentStatus,
        exit_time: exitTime,
        amount_due: amount_due,
        slot_id: slotId,
    });
};

export const getParkingSlotsParkingManager = async () => await axiosInstance.get(`${root}/slots`);

export const getVehicleTypes = async () => await axiosInstance.get(`${root}/vehicle-types`);

export const getTransactions = async () => await axiosInstance.get(`${root}/transactions`);

export const getTransaction = async (transactionUuid: string) =>
    await axiosInstance.get(`${root}/transaction?transaction_uuid=${transactionUuid}`);

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
}) =>
    await axiosInstance.post(`${root}/slot/create`, {
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

export const parkingManagerSignUp = async (
    userInformation: ParkingOwnerInformation,
    companyProfile: ParkingCompanyProfile,
    addressData: ParkingAddressData,
    parkingEstablishmentData: ParkingEstablishmentData,
    operatingHours: { [key: string]: ParkingOperatingHoursData },
    paymentMethodData: ParkingPaymentMethodData,
    documents: Documents,
) =>
    await axiosInstance.post(`${root}/signup`, {
        user: userInformation,
        company_profile: companyProfile,
        address: addressData,
        parking_establishment: parkingEstablishmentData,
        operating_hour: operatingHours,
        payment_method: paymentMethodData,
        documents: documents,
    });

export const getEstablishmentSchedules = () => axiosInstance.get(`${root}/operating-hours`);

export const updateEstablishmentSchedules = async ({
    operatingHours,
    is24_7,
}: {
    operatingHours: OperatingHour[];
    is24_7: boolean;
}) => {
    const transformedHours = DAYS_OF_WEEK.reduce(
        (acc, day) => {
            const daySchedule = operatingHours.find((h) => h.day_of_week === day);
            acc[day.toLowerCase()] = {
                enabled: daySchedule?.is_enabled ?? false,
                open: daySchedule?.opening_time ?? "09:00",
                close: daySchedule?.closing_time ?? "17:00",
            };
            return acc;
        },
        {} as Record<string, { enabled: boolean; open: string; close: string }>,
    );

    if (!is24_7 && !Object.values(transformedHours).some((day) => day.enabled)) {
        throw new Error("At least one day must be enabled");
    }

    Object.entries(transformedHours).forEach(([day, schedule]) => {
        if (schedule.enabled) {
            if (!schedule.open || !schedule.close) {
                throw new Error(`Operating hours are required for ${day}`);
            }
            if (schedule.open >= schedule.close) {
                throw new Error(`Opening time must be before closing time for ${day}`);
            }
        }
    });

    return await axiosInstance.patch(`${root}/operating-hours/update`, {
        is24_7: is24_7,
        operating_hour: transformedHours,
    });
};
