import * as Location from "expo-location";
import axios from "axios";

export async function getReverseGeocoding(latitude: number, longitude: number) {
    try {
        const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
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
    return status === "granted";
};

export const getUserLocation = async () => {
    return await Location.getCurrentPositionAsync({});
};

export const turnByTurnNavigation = async (
    userLatitude: number,
    userLongitude: number,
    destinationLatitude: number,
    destinationLongitude: number,
) => {
    return axios.get(
        `https://router.project-osrm.org/route/v1/driving/${userLongitude},${userLatitude};${destinationLongitude},${destinationLatitude}?overview=full&geometries=geojson`,
    );
};
