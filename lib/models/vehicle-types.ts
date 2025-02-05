export interface VehicleType {
    code: string;
    created_at: string;
    description: string;
    is_active: boolean;
    name: string;
    size_category: "SMALL" | "MEDIUM" | "LARGE";
    updated_at: string;
    uuid: string;
    vehicle_type_id: number;
}
