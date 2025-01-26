import toRad from './toRad';

export default function calculateDistance(
	latitude_one: number,
	longitude_one: number,
	latitude_two: number,
	longitude_two: number
): number {
	const R = 6371;
	const dLat = toRad(latitude_two - latitude_one);
	const dLon = toRad(longitude_two - longitude_one);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(latitude_one)) *
			Math.cos(toRad(latitude_two)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}
