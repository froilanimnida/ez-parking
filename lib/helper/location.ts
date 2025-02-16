import * as Location from "expo-location";
import PlatformType from "@lib/helper/platform";

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
    if (PlatformType() === "web") {
        navigator.geolocation.getCurrentPosition((position) => {
            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
        });
    } else {
        const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1,
            mayShowUserSettingsDialog: true,
        });
        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
        };
    }
};
