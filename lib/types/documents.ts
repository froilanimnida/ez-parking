export interface Documents {
    govId: File | null;
    parkingPhotos: File[] | null;
    proofOfOwnership: File | null;
    businessCert: File | null;
    birCert: File | null;
    liabilityInsurance: File | null;
}

export interface DocumentInfo {
    name: string;
    uri: string;
    type: string;
    size: number;
}
