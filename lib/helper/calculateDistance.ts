export default function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadian = (degree: number) => (degree * Math.PI) / 180;
    const R = 6371;

    const dLat = toRadian(lat2 - lat1);
    const dLon = toRadian(lon2 - lon1);

    const lat1Rad = toRadian(lat1);
    const lat2Rad = toRadian(lat2);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10;
}
