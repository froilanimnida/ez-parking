/**
 * Validates if two times have at least 1 hour difference between them
 * @param hourOne First time in HH:MM format (24-hour)
 * @param hourTwo Second time in HH:MM format (24-hour)
 * @returns boolean - true if times are valid and have ≥1 hour difference
 */
export default function validateTwoDifferentHours(hourOne: string, hourTwo: string): boolean {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(hourOne) || !timeRegex.test(hourTwo)) {
        return false;
    }

    try {
        const today = new Date();
        const [hours1, minutes1] = hourOne.split(':').map(Number);
        const [hours2, minutes2] = hourTwo.split(':').map(Number);

        const time1 = new Date(today.setHours(hours1, minutes1, 0));
        const time2 = new Date(today.setHours(hours2, minutes2, 0));

        const diffInMs = Math.abs(time2.getTime() - time1.getTime());
        const diffInHours = diffInMs / (1000 * 60 * 60);

        return diffInHours >= 1;
    } catch {
        return false;
    }
}
