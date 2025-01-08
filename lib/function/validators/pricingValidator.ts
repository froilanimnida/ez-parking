// pricing-validator.ts
export interface PricingConfig {
    rate_type: 'hourly' | 'daily' | 'monthly';
    is_enabled: boolean;
    rate: number;
}

export interface PricingValidationError {
    rate_type?: string;
    message: string;
}

export function validatePricing(pricing: Record<string, PricingConfig>): PricingValidationError[] {
    const errors: PricingValidationError[] = [];

    // Check if at least one pricing option is enabled
    const hasEnabledRate = Object.values(pricing).some((config) => config.is_enabled);
    if (!hasEnabledRate) {
        errors.push({
            message: 'At least one pricing rate must be enabled'
        });
        return errors;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(pricing).forEach(([_, config]) => {
        if (config.is_enabled) {
            if (!config.rate || config.rate <= 0) {
                errors.push({
                    rate_type: config.rate_type,
                    message: `${config.rate_type.charAt(0).toUpperCase() + config.rate_type.slice(1)} rate must be greater than 0`
                });
            } else {
                switch (config.rate_type) {
                    case 'hourly':
                        if (config.rate > 1000) {
                            errors.push({
                                rate_type: config.rate_type,
                                message: 'Hourly rate cannot exceed ₱1,000'
                            });
                        }
                        break;
                    case 'daily':
                        if (config.rate > 10000) {
                            errors.push({
                                rate_type: config.rate_type,
                                message: 'Daily rate cannot exceed ₱10,000'
                            });
                        }
                        break;
                    case 'monthly':
                        if (config.rate > 50000) {
                            errors.push({
                                rate_type: config.rate_type,
                                message: 'Monthly rate cannot exceed ₱50,000'
                            });
                        }
                        break;
                }
            }
        }
    });

    return errors;
}
