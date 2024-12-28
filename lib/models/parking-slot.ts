export interface ParkingSlot {
    slot_id: number;
    uuid: string;
    establishment_id: number;
    slot_code: string;
    vehicle_type_id: number;
    slot_status: 'open' | 'occupied' | 'reserved' | 'closed';
    is_active: boolean;
    slot_features: 'standard' | 'premium';
    is_premium: boolean;
    base_rate: number;
    slot_multiplier: number;
    floor_level: number;
    created_at: string;
    updated_at: string;
}
