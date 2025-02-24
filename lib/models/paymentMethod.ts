export interface PaymentMethod {
    accepts_cash: boolean;
    accepts_mobile: boolean;
    accepts_other: boolean;
    created_at: string;
    establishment_id: number;
    method_id: number;
    other_methods: string;
    updated_at: string;
}
