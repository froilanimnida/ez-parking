import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { getUserLocation, askLocationPermission, getIPBasedLocation } from "@lib/helper/location";
import calculateDistance from "@lib/helper/calculateDistance";

const ORS_API_KEY = Constants.expoConfig.extra.openRouteServiceApiKey;

const TextNavigation = () => {
    const [instructions, setInstructions] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [watchId, setWatchId] = useState<number | null>(null);

    const getRoute = async () => {
        console.log(ORS_API_KEY);
        try {
            // Get user's current location
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Destination (e.g., Manila City Hall)
                    const endLat = 14.5906;
                    const endLon = 120.9781;

                    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${longitude},${latitude}&end=${endLon},${endLat}`;

                    const response = await axios.get(url);
                    const steps = response.data.features[0].properties.segments[0].steps;

                    const parsedInstructions = steps.map((step: any, index: number) => ({
                        id: index.toString(),
                        instruction: step.instruction,
                        distance: step.distance,
                        location: step.way_points,
                    }));

                    setInstructions(parsedInstructions);
                    setCurrentStepIndex(0);

                    startTracking(parsedInstructions);
                },
                (error) => {
                    Alert.alert("Error", "Unable to get location. Please enable GPS.");
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        } catch (error) {
            Alert.alert("Error", "Failed to get route.");
        }
    };

    const startTracking = (steps: any[]) => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
        }

        const id = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                checkNextStep(latitude, longitude, steps);
            },
            (error) => {
                console.log("GPS Error:", error);
            },
            { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 },
        );

        setWatchId(id);
    };

    const checkNextStep = (lat: number, lon: number, steps: any[]) => {
        if (currentStepIndex >= steps.length - 1) {
            Alert.alert("You have reached your destination.");
            if (watchId) navigator.geolocation.clearWatch(watchId);
            return;
        }

        const nextStep = steps[currentStepIndex + 1];
        const [nextLat, nextLon] = nextStep.location;

        const distance = calculateDistance(lat, lon, nextLat, nextLon);
        console.log(`Distance to next step: ${distance} meters`);

        if (distance < 20) {
            setCurrentStepIndex((prev) => prev + 1);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Button title="Start Navigation" onPress={getRoute} />
            <FlatList
                data={instructions}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <Text style={{ marginVertical: 5 }}>
                        {index + 1}. {item.instruction} ({item.distance} meters)
                    </Text>
                )}
            />
        </View>
    );
};

export default TextNavigation;
