export interface ParkingOwnerInformation {
    email: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    suffix: string;
    phone_number: string;
}

export interface ParkingCompanyProfile {
    owner_type: "company" | "individual";
    company_name: string;
    company_reg_number: string;
    tin: string;
}

export interface ParkingAddressData {
    street: string;
    barangay: string;
    city: string;
    province: string;
    postal_code: string;
}

export interface ParkingEstablishmentData {
    space_type: string;
    space_layout: string;
    custom_layout: string;
    dimensions: string;
    is24_7: false;
    access_info: "gate_code" | "security_check" | "key_pickup" | "no_specific_access" | "other";
    custom_access: string;
    name: string;
    lighting: string;
    accessibility: string;
    facilities: string;
    longitude: number;
    latitude: number;
    nearby_landmarks: string;
}

export interface ParkinOperatingHoursData {
    enabled: boolean;
    open: string;
    close: string;
}

export interface ParkingPaymentMethodData {
    accepts_cash: false;
    accepts_mobile: false;
    accepts_other: false;
    other_methods: string;
}
