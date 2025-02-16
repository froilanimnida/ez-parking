export const calculateDuration = (scheduledEntry: string, duration: number, durationType: string): Date => {
    const entryDate = new Date(scheduledEntry);
    const exitDate = new Date(entryDate); // Create new date object based on entry

    switch (durationType) {
        case "hourly":
            exitDate.setHours(exitDate.getHours() + duration);
            break;
        case "daily":
            exitDate.setDate(exitDate.getDate() + duration);
            break;
        case "monthly":
            exitDate.setMonth(exitDate.getMonth() + duration);
            break;
        default:
            return entryDate;
    }

    return exitDate;
};
