import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUserLocation, askLocationPermission } from "@lib/helper/location";
import calculateDistance from "@lib/helper/calculateDistance";
import { useLocalSearchParams } from "expo-router";
import ButtonComponent from "@components/ButtonComponent";

const HERE_API_KEY = "fZLMSapFkFoGIvQXQ0y9Kzi7Juf3SQY7oXcF_S3A1EE";

const actionIcons = {
    depart: "car",
    turn: "chevron-right",
    continue: "arrow-up",
    keep: "arrow-up",
    arrive: "flag-checkered",
    head: "arrow-up",
    roundaboutExit: "format-rotate-90",
};

const TextNavigation = () => {
    const urlSearchParams = useLocalSearchParams();
    const [instructions, setInstructions] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [watchId, setWatchId] = useState<number | null>(null);

    const getRoute = async () => {
        try {
            const result = await askLocationPermission();
            if (!result) {
                alert("Error, Location permission not granted.");
                return;
            }
            const location = await getUserLocation();
            const { latitude, longitude } = location;
            const endLat = urlSearchParams.latitude;
            const endLon = urlSearchParams.longitude;

            const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${latitude},${longitude}&destination=${endLat},${endLon}&return=polyline,summary,actions,instructions&apiKey=${HERE_API_KEY}`;

            const response = await axios.get(url);
            const steps = response.data.routes[0].sections[0].actions;

            const parsedInstructions = steps.map((step: any, index: number) => ({
                id: index.toString(),
                action: step.action,
                instruction: step.instruction,
                distance: step.length,
                location: [step.offset.start, step.offset.end],
            }));

            setInstructions(parsedInstructions);
            setCurrentStepIndex(0);

            startTracking(parsedInstructions);
        } catch (error) {
            alert("Error, Failed to get route.");
        }
    };

    const startTracking = (steps: any[]) => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
        }

        const id = setInterval(async () => {
            const location = await getUserLocation();
            const { latitude, longitude } = location;
            checkNextStep(latitude, longitude, steps);
        }, 5000);

        setWatchId(id);
    };

    const checkNextStep = (lat: number, lon: number, steps: any[]) => {
        if (currentStepIndex >= steps.length - 1) {
            alert("You have reached your destination.");
            if (watchId) clearInterval(watchId);
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
            <ButtonComponent title="Start Navigation" onPress={getRoute} />
            <FlatList
                data={instructions}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.instructionContainer}>
                        <MaterialCommunityIcons name={actionIcons[item.action]} size={24} style={styles.icon} />
                        <Text style={styles.instructionText}>
                            {index + 1}. {item.instruction} ({item.distance} meters)
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    instructionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    icon: {
        marginRight: 10,
    },
    instructionText: {
        fontSize: 16,
    },
});

export default TextNavigation;
