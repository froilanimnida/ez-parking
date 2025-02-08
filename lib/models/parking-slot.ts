export interface ParkingSlot {
    slot_id: number;
    uuid: string;
    establishment_id: number;
    slot_code: string;
    vehicle_type_id: number;
    slot_status: "open" | "occupied" | "reserved" | "closed";
    is_active: boolean;
    slot_features: "standard" | "covered" | "vip" | "disabled" | "ev_charging";
    is_premium: boolean;
    floor_level: number;
    created_at: string;
    updated_at: string;
    base_price_per_hour: string;
    base_price_per_day: string;
    base_price_per_month: string;
    price_multiplier: string;
}
