import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

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
                initialRegion={{
                    latitude: initialLatitude,
                    longitude: initialLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => {
                    onLocationChange(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
                }}
                showsUserLocation={true}
                zoomEnabled={true}
            >
                {/* <OSMDroidMap
                    region={{
                        latitude: initialLatitude,
                        longitude: initialLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                    draggable
                    onDragEnd={(e) => {
                        onLocationChange(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
                    }}
                /> */}
                {/* {this?.state.markers.map((marker) => (
                    <Marker coordinate={marker.latlng} title={marker.title} description={marker.description} />
                ))} */}
            </MapView>
        </View>
    );
};

export default NativeLocationPicker;
