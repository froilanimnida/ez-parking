export interface Transaction {
    transaction_id: number;
    uuid: string;
    slot_id: number;
    entry_time: string;
    exit_time: string;

    amount_due: string;
    base_rate: number;
    created_at: string;
    duration_type: string;
    establishment_id: number;
    floor_level: number;
    is_active: boolean;
    is_premium: boolean;
    payment_status: string;
    slot_code: string;
    status: "reserved" | "active" | "cancelled" | "completed";
    updated_at: string;
    user_id: number;
    vehicle_type_id: number;
}
