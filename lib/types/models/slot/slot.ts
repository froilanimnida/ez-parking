export interface SlotInfoInterface {
	slot_id: number;
	establishment_name: string;
	slot_code: string;
	vehicle_type_id: number;
	vehicle_type_code: string;
	vehicle_type_description: string;
	vehicle_type_name: string;
	size_category: 'SMALL' | 'MEDIUM' | 'LARGE';
	status: 'open' | 'reserved' | 'occupied';
	is_active: boolean;
	slot_multiplier: number;
	is_premium: boolean;
	slot_features: 'STANDARD' | 'COVERED' | 'VIP' | 'DISABLED' | 'EV CHARGING';
	floor_level: number;
	created_at: string;
	updated_at: string;
}

export interface APISlotBaseResponse {
	get: {
		code: string;
		message: string;
		slot: SlotInfoInterface;
	};
}
