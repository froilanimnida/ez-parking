export interface EstablishmentDocument {
    bucket_path: string;
    document_id: number;
    document_type: string;
    establishment_id: number;
    file_size: number;
    filename: string;
    mime_type: string;
    status: string;
    uploaded_at: string;
    uuid: string;
    verification_notes: string;
    verified_at: string;
    verified_by: number;
}
