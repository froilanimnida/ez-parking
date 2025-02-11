import React from "react";
import WebLocationPicker from "./WebLocationPicker";
import NativeLocationPicker from "./NativeLocationPicker";
import PlatformType from "@/lib/platform";

interface LocationPickerProps {
    initialLatitude: number;
    initialLongitude: number;
    onLocationChange: (latitude: number, longitude: number) => void;
}

const LocationPicker = (props: LocationPickerProps) => {
    if (PlatformType() === "web") {
        return <WebLocationPicker {...props} />;
    } else {
        return <NativeLocationPicker {...props} />;
    }
};

export default LocationPicker;
