import React, { useEffect, useRef } from "react";
import { Platform, View } from "react-native";

interface WebLocationPickerProps {
    initialLatitude: number;
    initialLongitude: number;
    onLocationChange: (latitude: number, longitude: number) => void;
}

const WebLocationPicker: React.FC<WebLocationPickerProps> = ({
    initialLatitude,
    initialLongitude,
    onLocationChange,
}) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Add Leaflet CSS
        const linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
        document.head.appendChild(linkEl);

        // Add Leaflet JS
        const scriptEl = document.createElement("script");
        scriptEl.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
        scriptEl.onload = () => {
            const L = (window as any).L;
            const map = L.map(mapRef.current).setView([initialLatitude, initialLongitude], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "© OpenStreetMap contributors",
            }).addTo(map);

            let marker = L.marker([initialLatitude, initialLongitude], {
                draggable: true,
            }).addTo(map);

            marker.on("dragend", function (e: any) {
                const position = marker.getLatLng();
                onLocationChange(position.lat, position.lng);
            });

            map.on("click", function (e: any) {
                marker.setLatLng(e.latlng);
                onLocationChange(e.latlng.lat, e.latlng.lng);
            });

            // Cleanup function
            return () => {
                map.remove();
                document.head.removeChild(linkEl);
                document.head.removeChild(scriptEl);
            };
        };
        document.head.appendChild(scriptEl);
    }, [initialLatitude, initialLongitude, onLocationChange]);

    return (
        <View style={{ height: 300, width: "100%" }}>
            <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
        </View>
    );
};

export default WebLocationPicker;
