const PLATE_NUMBER_PATTERNS = [
	/^[A-Z]{2,3}[\s-]?\d{3,4}$/, // Private vehicles (e.g., ABC 1234, AB 1234)
	/^[A-Z]{3}[\s-]?\d{3}$/, // Public utility vehicles (e.g., UVW 123)
	/^CD[\s-]?\d{4}$/, // Diplomatic corps (e.g., CD 1234)
	/^[A-Z]{2}[\s-]?\d{4}$/, // Government vehicles (e.g., SG 1234)
	/^[A-Z]{2}[\s-]?\d{3}[A-Z]$/, // Motorcycles (e.g., MH 123A)
	/^[A-Z]{3}[\s-]?\d{4}$/, // Modern PUVs (e.g., NGV 1234)
	/^\d{4}$/ // Older series (e.g., 1234)
];

export function validatePlateNumber(plateNumber: string): boolean {
	// Remove extra spaces and convert to uppercase
	const normalizedPlate = plateNumber.trim().toUpperCase();

	// Test against each pattern
	return PLATE_NUMBER_PATTERNS.some((pattern) => pattern.test(normalizedPlate));
}

// Optional: Return detailed validation result
export function getPlateNumberValidationDetails(plateNumber: string): {
	isValid: boolean;
	format?: string;
	error?: string;
} {
	const normalizedPlate = plateNumber.trim().toUpperCase();

	for (let i = 0; i < PLATE_NUMBER_PATTERNS.length; i++) {
		if (PLATE_NUMBER_PATTERNS[i].test(normalizedPlate)) {
			return {
				isValid: true,
				format: getFormatDescription(i)
			};
		}
	}

	return {
		isValid: false,
		error: 'Invalid plate number format'
	};
}

function getFormatDescription(index: number): string {
	const formats = [
		'Private Vehicle',
		'Public Utility Vehicle',
		'Diplomatic Corps',
		'Government Vehicle',
		'Motorcycle',
		'Modern PUV',
		'Old Series'
	];
	return formats[index];
}
