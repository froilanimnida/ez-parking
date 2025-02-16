export interface Documents {
    gov_id: File | null;
    parking_photos: File[] | null;
    proof_of_ownership: File | null;
    business_cert: File | null;
    bir_cert: File | null;
    liability_insurance: File | null;
}

export interface DocumentInfo {
    name: string;
    uri: string;
    type: string;
    size: number;
}
