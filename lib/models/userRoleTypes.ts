import type { Address } from "./address";
import type { ParkingEstablishment } from "./parking-establishment";
import type { ParkingSlot } from "./parking-slot";
import type { Transaction } from "./transaction";

export interface TransactionDetailsType {
    address_info: Address;
    contact_number: string;
    establishment_info: ParkingEstablishment;
    qr_code: string;
    slot_info: ParkingSlot & {
        vehicle_type_code: string;
        vehicle_type_id: number;
        vehicle_type_name: string;
        vehicle_type_size: string;
    };
    transaction_data: Transaction;
    user_plate_number: string;
}
