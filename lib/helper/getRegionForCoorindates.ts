interface Point {
    latitude: number;
    longitude: number;
}

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export const getRegionForCoordinates = (points: Point[]): Region => {
    let minX: number | undefined, maxX: number | undefined, minY: number | undefined, maxY: number | undefined;

    // Initialize the min and max values
    points.forEach((point) => {
        minX = minX === undefined ? point.latitude : Math.min(minX, point.latitude);
        maxX = maxX === undefined ? point.latitude : Math.max(maxX, point.latitude);
        minY = minY === undefined ? point.longitude : Math.min(minY, point.longitude);
        maxY = maxY === undefined ? point.longitude : Math.max(maxY, point.longitude);
    });

    const midX = minX && maxX ? (minX + maxX) / 2 : 0;
    const midY = minY && maxY ? (minY + maxY) / 2 : 0;
    const deltaX = maxX && minX ? maxX - minX : 0;
    const deltaY = maxY && minY ? maxY - minY : 0;

    return {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX * 1.5,
        longitudeDelta: deltaY * 1.5,
    };
};
