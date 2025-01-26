export interface PricingPlan {
    created_at: string;
    establishment_id: number;
    is_enabled: boolean;
    plan_id: number;
    rate: string;
    rate_type: 'hourly' | 'daily' | 'monthly';
    updated_at: string;
}
