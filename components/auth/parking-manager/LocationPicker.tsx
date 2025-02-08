import React from "react";
import { Platform, Text } from "react-native";
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
        // return <NativeLocationPicker {...props} />;
        return <Text>NativeLocationPicker</Text>;
    }
};

export default LocationPicker;
