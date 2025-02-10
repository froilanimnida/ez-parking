import axiosInstance from "../axiosInstance";
import type { CompanyProfile } from "../models/company-profile";
import type { ParkingAddressData, ParkingEstablishmentData } from "../models/parkingManagerSignUpTypes";

interface OwnerInformation {
    first_name: string;
    last_name: string;
    middle_name: string;
    suffix: string;
    email: string;
    phone_number: string;
    company_profile: {
        owner_type: string;
        company_name: string;
        company_reg_number: string;
        tin: string;
    };
}

interface AddressData {
    street: string;
    barangay: string;
    city: string;
    province: string;
    postal_code: string;
}

interface ParkingEstablishment {
    space_type: string;
    space_layout: string;
    custom_layout: string;
    dimensions: string;
    is24_7: boolean;
    access_info: string;
    custom_access: string;
    name: string;
    lighting: string;
    accessibility: string;
    facilities: string;
    longitude: string;
    latitude: string;
    nearby_landmarks: string;
}

interface OperatingHours {
    enabled: boolean;
    open: string;
    close: string;
}

interface OperatingSchedule {
    monday: OperatingHours;
    tuesday: OperatingHours;
    wednesday: OperatingHours;
    thursday: OperatingHours;
    friday: OperatingHours;
    saturday: OperatingHours;
    sunday: OperatingHours;
}

interface PaymentData {
    accepts_cash: boolean;
    accepts_mobile: boolean;
    accepts_other: boolean;
    other_methods: string;
}

interface ParkingManagerSignUpData {
    owner_information: OwnerInformation;
    address: AddressData;
    parking_establishment: ParkingEstablishment;
    operating_hour: OperatingSchedule;
    payment_method: PaymentData;
}

const root = "/parking-manager" as const;
export const qrContentOverview = async (qrContent: string) => {
    const result = await axiosInstance.get(`${root}/qr-content/overview?qr_content=${qrContent}`);
    return result;
};




export const parkingManagerSignUp = (
    userInformation: OwnerInformation,
    companyProfile: CompanyProfile,
    addressData: ParkingAddressData,
    parkingEstablishmentData: ParkingEstablishmentData,
    operatingHours: { [key: string]: OperatingHours },
    paymentMethodData: PaymentMethodData
) => {};
