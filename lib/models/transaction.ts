export interface Transaction {
    amount_due: string;
    base_rate: string;
    created_at: string;
    duration_type: string;
    entry_time: string;
    establishment_id: number;
    exit_time: string;
    floor_level: number;
    is_active: boolean;
    is_premium: boolean;
    payment_status: string;
    slot_code: string;
    slot_features: string;
    slot_id: number;
    slot_multiplier: string;
    slot_status: string;
    status: 'paid' | 'pending' | 'completed' | 'failed';
    transaction_id: number;
    updated_at: string;
    user_id: number;
    uuid: string;
    vehicle_type_id: number;
}
