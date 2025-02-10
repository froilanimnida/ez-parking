import axiosInstance from "../axiosInstance";
import type {
    ParkingAddressData,
    ParkingEstablishmentData,
    ParkinOperatingHoursData,
    ParkingCompanyProfile,
    ParkingOwnerInformation,
    ParkingPaymentMethodData,
} from "../models/parkingManagerSignUpTypes";

const root = "/parking-manager" as const;
export const qrContentOverview = async (qrContent: string) => {
    const result = await axiosInstance.get(`${root}/qr-content/overview?qr_content=${qrContent}`);
    return result;
};

export const parkingManagerSignUp = async (
    userInformation: ParkingOwnerInformation,
    companyProfile: ParkingCompanyProfile,
    addressData: ParkingAddressData,
    parkingEstablishmentData: ParkingEstablishmentData,
    operatingHours: { [key: string]: ParkinOperatingHoursData },
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
