export interface ApiResponse<T> {
	code: string;
	data?: T;
	error?: string;
	message?: string;
}
