export default interface ApiValidationError {
    name: "ValidationError";
    status: number;
    message: string;
    fields: {
        [key: string]: string[];
    };
    code: number;
    errors: {
        json?: {
            [key: string]: {
                [key: string]: string[];
            };
        };
    };
}

export interface SimplifiedValidationError {
    name: "ValidationError";
    status: number;
    messages: string[];
    code: number;
}
