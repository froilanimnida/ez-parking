import React from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";

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
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
            <style>
                body, html { margin: 0; padding: 0; height: 100%; width: 100%; }
                #map { height: 100vh; width: 100vw; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
            <script>
                var map = L.map('map', {
                    center: [${initialLatitude}, ${initialLongitude}],
                    zoom: 15,
                    zoomControl: true,
                    gestureHandling: true
                });

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);

                var marker = L.marker([${initialLatitude}, ${initialLongitude}], { draggable: true }).addTo(map);

                marker.on("dragend", function(e) {
                    var latlng = marker.getLatLng();
                    window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: latlng.lat, longitude: latlng.lng }));
                });

                map.on("click", function(e) {
                    marker.setLatLng(e.latlng);
                    window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: e.latlng.lat, longitude: e.latlng.lng }));
                });

                map.on('moveend', function() {
                    var center = map.getCenter();
                    window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: center.lat, longitude: center.lng }));
                });

            </script>
        </body>
        </html>
    `;

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={["*"]}
                source={{ html: htmlContent }}
                onMessage={(event) => {
                    const { latitude, longitude } = JSON.parse(event.nativeEvent.data);
                    onLocationChange(latitude, longitude);
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={false}
                allowsFullscreenVideo={true}
                allowsInlineMediaPlayback={true}
                mixedContentMode="always"
                androidLayerType="hardware"
                webviewDebuggingEnabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, height: 400, width: "100%" },
});

export default NativeLocationPicker;
