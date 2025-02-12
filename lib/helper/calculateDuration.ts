export const calculateDuration = (entry: string, exit: string, durationType: string) => {
    const entryDate = new Date(entry);
    const exitDate = new Date(exit);

    const diffInMilliseconds = exitDate.getTime() - entryDate.getTime();

    switch (durationType) {
        case "hourly":
            return Math.ceil(diffInMilliseconds / (1000 * 60 * 60));
        case "daily":
            return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        case "monthly":
            return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
        default:
            return 0;
    }
};
