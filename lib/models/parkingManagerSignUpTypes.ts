export interface ParkingOwnerInformation {
    email: "";
    first_name: "";
    last_name: "";
    middle_name: "";
    suffix: "";
    phone_number: "";
}

export interface ParkingCompanyProfile {
    owner_type: "company" | "individual";
    company_name: "";
    company_reg_number: "";
    tin: "";
}

export interface ParkingAddressData {
    street: "";
    barangay: "";
    city: "";
    province: "";
    postal_code: "";
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
    longitude: string;
    latitude: string;
    nearby_landmarks: string;
}

export interface ParkinOperatingHoursData {
    enabled: false;
    open: "";
    close: "";
}

export interface ParkingPaymentMethodData {
    accepts_cash: false;
    accepts_mobile: false;
    accepts_other: false;
    other_methods: "";
}
