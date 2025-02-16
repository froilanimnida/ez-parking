import * as Location from "expo-location";

export async function getReverseGeocoding(latitude: number, longitude: number) {
    try {
        const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        return data.locality;
    } catch (error) {
        return "Manila";
    }
}
export const getIPBasedLocation = async () => {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return {
            latitude: data.latitude,
            longitude: data.longitude,
        };
    } catch (error) {
        return {
            latitude: 14.5995,
            longitude: 120.9842,
        };
    }
};

export const askLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted"
}
