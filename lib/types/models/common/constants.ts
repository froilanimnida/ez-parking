export const SLOT_FEATURES = ["standard", "covered", "vip", "disabled", "ev_charging"] as const;
export const SLOT_STATUS = ["open", "occupied", "reserved", "closed"] as const;
export const ADMIN_ESTABLISHMENT_FILTERS = ["all", "approved", "pending"];
export const METRO_MANILA_CITIES = [
    "Caloocan",
    "Las Piñas",
    "Makati",
    "Malabon",
    "Mandaluyong",
    "Manila",
    "Marikina",
    "Muntinlupa",
    "Navotas",
    "Parañaque",
    "Pasay",
    "Pasig",
    "Quezon City",
    "San Juan",
    "Pateros",
    "Valenzuela",
];

export const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export type DaysOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export type CITY = (typeof METRO_MANILA_CITIES)[number];
export type UserRole = "user" | "parking_manager" | "admin";
