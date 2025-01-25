import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import * as Location from "expo-location";
import EstablishmentItem from "@/components/EstablishmentItem";
import type { ParkingEstablishment } from "@/lib/models/parking-establishment";
import type { PricingPlan } from "@/lib/models/pricing-plan";
import ButtonComponent from "@/components/ButtonComponent";
import TextInputComponent from "@/components/TextInputComponent";
export interface EstablishmentQuery extends ParkingEstablishment {
    open_slots: number;
    total_slots: number;
    reserved_slot: number;
    occupied_slots: number;
    pricing_plans: PricingPlan[];
}

export default function EstablishmentSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [establishments, setEstablishments] = useState<EstablishmentQuery[]>([]);
    const [location, setLocation] = useState({
        latitude: 14.5995,
        longitude: 120.9842,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                getIPBasedLocation();
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                getIPBasedLocation();
            }
        })();
    }, []);

    const getIPBasedLocation = async () => {
        try {
            const response = await fetch("https://ipapi.co/json/");
            const data = await response.json();
            setLocation({
                latitude: data.latitude,
                longitude: data.longitude,
            });
        } catch (error) {
            // Use default Manila coordinates
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        // Implement your search API call here
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <TextInputComponent
                        customStyles={styles.searchInput}
                        placeholder="Search for parking establishments..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <ButtonComponent title="Search" onPress={handleSearch} />
                </View>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content}>
                {!searchTerm ? (
                    <View style={styles.emptyState}>{/* Empty state UI */}</View>
                ) : loading ? (
                    <View style={styles.loadingContainer}>{/* Loading indicator */}</View>
                ) : establishments.length === 0 ? (
                    <View style={styles.noResults}>{/* No results UI */}</View>
                ) : (
                    <View style={styles.results}>
                        {establishments.map((establishment) => (
                            <EstablishmentItem
                                key={establishment.establishment_id}
                                establishment={establishment}
                                userLat={location.latitude}
                                userLong={location.longitude}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    header: {
        backgroundColor: "white",
        padding: 16,
        paddingTop: 48,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    logo: {
        height: 64,
        width: 120,
        resizeMode: "contain",
    },
    searchContainer: {
        flexDirection: "row",
        marginTop: 16,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#f3f4f6",
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    searchButton: {
        backgroundColor: "#4f46e5",
        borderRadius: 8,
        padding: 12,
        justifyContent: "center",
    },
    searchButtonText: {
        color: "white",
        fontWeight: "600",
    },
    content: {
        flex: 1,
        padding: 16,
    },
    results: {
        flex: 1,
        gap: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noResults: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
