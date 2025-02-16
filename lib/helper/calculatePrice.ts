interface PriceCalculationProps {
    base_price_per_hour: string;
    base_price_per_day: string;
    base_price_per_month: string;
    is_premium: boolean;
    duration: number;
    duration_type: "hourly" | "daily" | "monthly";
}

export const calculatePrice = ({
    base_price_per_hour,
    base_price_per_day,
    base_price_per_month,
    is_premium,
    duration,
    duration_type,
}: PriceCalculationProps): number => {
    const hourlyRate = parseFloat(base_price_per_hour);
    const dailyRate = parseFloat(base_price_per_day);
    const monthlyRate = parseFloat(base_price_per_month);

    if (duration <= 0) {
        return 0;
    }

    if (duration_type === "hourly" && hourlyRate === 0) {
        throw new Error("Hourly rate not available for this slot");
    }

    if (duration_type === "daily" && dailyRate === 0) {
        throw new Error("Daily rate not available for this slot");
    }

    if (duration_type === "monthly" && monthlyRate === 0) {
        throw new Error("Monthly rate not available for this slot");
    }

    // Premium multiplier (20% increase for premium slots)
    const premiumMultiplier = is_premium ? 1.2 : 1;

    // Calculate base price according to duration type
    let basePrice = 0;
    switch (duration_type) {
        case "hourly":
            basePrice = hourlyRate * duration;
            break;
        case "daily":
            basePrice = dailyRate * duration;
            break;
        case "monthly":
            basePrice = monthlyRate * duration;
            break;
        default:
            basePrice = 0;
    }

    const finalPrice = basePrice * premiumMultiplier;

    return Math.round(finalPrice * 100) / 100;
};
