export interface User {
    user_id: number;
    uuid: string;
    nickname?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    suffix?: string;
    email: string;
    phone_number: string;
    role: 'admin' | 'user' | 'parking_manager';
    plate_number?: string;
    is_verified: boolean;
    created_at: string;
}
