import React from "react";
import { Platform } from "react-native";
import WebLocationPicker from "./auth/parking-manager/WebLocationPicker";
import NativeLocationPicker from "./auth/parking-manager/NativeLocationPicker";

interface LocationPickerProps {
    initialLatitude: number;
    initialLongitude: number;
    onLocationChange: (latitude: number, longitude: number) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ initialLatitude, initialLongitude, onLocationChange }) => {
    return Platform.select({
        web: (
            <WebLocationPicker
                initialLatitude={initialLatitude}
                initialLongitude={initialLongitude}
                onLocationChange={onLocationChange}
            />
        ),
        default: (
            <NativeLocationPicker
                initialLatitude={initialLatitude}
                initialLongitude={initialLongitude}
                onLocationChange={onLocationChange}
            />
        ),
    });
};

export default LocationPicker;
