export interface OperatingHour {
    closing_time: string;
    day_of_week: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    establishment_id?: number;
    hours_id?: number;
    is_enabled: boolean;
    opening_time: string;
}

interface OperatingHours {
    enabled: boolean;
    open: string;
    close: string;
}

export interface OperatingSchedule {
    monday: OperatingHours;
    tuesday: OperatingHours;
    wednesday: OperatingHours;
    thursday: OperatingHours;
    friday: OperatingHours;
    saturday: OperatingHours;
    sunday: OperatingHours;
}
