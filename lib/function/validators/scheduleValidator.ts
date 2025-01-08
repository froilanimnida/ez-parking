export interface OperatingHours {
	enabled: boolean;
	open: string;
	close: string;
}

export interface ScheduleValidationError {
	day?: string;
	message: string;
}

export function validateSchedule(
	schedule: Record<string, OperatingHours>
): ScheduleValidationError[] {
	const errors: ScheduleValidationError[] = [];

	const hasEnabledDay = Object.values(schedule).some((day) => day.enabled);
	if (!hasEnabledDay) {
		errors.push({
			message: 'At least one day must be enabled'
		});
	}

	Object.entries(schedule).forEach(([day, hours]) => {
		if (hours.enabled) {
			if (!hours.open || !hours.close) {
				errors.push({
					day,
					message: 'Operating hours are required when day is enabled'
				});
			} else {
				const openTime = new Date(`1970-01-01T${hours.open}`);
				const closeTime = new Date(`1970-01-01T${hours.close}`);

				if (openTime >= closeTime) {
					errors.push({
						day,
						message: 'Opening time must be before closing time'
					});
				}
			}
		}
	});

	return errors;
}
