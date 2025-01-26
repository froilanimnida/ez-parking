import type { PricingPlan } from "@/lib/models/pricing-plan";
import type { ParkingEstablishment } from "@/lib/models/parking-establishment";

export interface EstablishmentQuery extends ParkingEstablishment {
    open_slots: number;
    total_slots: number;
    reserved_slot: number;
    occupied_slots: number;
    pricing_plans: PricingPlan[];
}
