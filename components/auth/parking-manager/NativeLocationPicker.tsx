import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_DEFAULT, Region } from "react-native-maps";

interface NativeLocationPickerProps {
    initialLatitude: number;
    initialLongitude: number;
    onLocationChange: (latitude: number, longitude: number) => void;
}

const NativeLocationPicker: React.FC<NativeLocationPickerProps> = ({
    initialLatitude,
    initialLongitude,
    onLocationChange,
}) => {
    return (
        <View style={{ height: 300, width: "100%" }}>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_DEFAULT}
                initialRegion={{
                    latitude: initialLatitude,
                    longitude: initialLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onRegionChangeComplete={(region: Region) => {
                    console.log(region);
                    onLocationChange(region.latitude, region.longitude);
                }}
                mapType="standard"
                zoomEnabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    overlay: {
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 10,
        borderRadius: 5,
    },
    text: { color: "white" },
});

export default NativeLocationPicker;
