import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Animated, Modal, Pressable } from "react-native";
import * as Location from "expo-location";
import EstablishmentItem from "@/components/EstablishmentItem";
import TextComponent from "@/components/TextComponent";
import type { ParkingEstablishment } from "@/lib/models/parking-establishment";
import type { PricingPlan } from "@/lib/models/pricing-plan";
import ButtonComponent from "@/components/ButtonComponent";
import TextInputComponent from "@/components/TextInputComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlatformType from "@/lib/platform";
export interface EstablishmentQuery extends ParkingEstablishment {
    open_slots: number;
    total_slots: number;
    reserved_slot: number;
    occupied_slots: number;
    pricing_plans: PricingPlan[];
}

export default function EstablishmentSearch() {
    const [establishments, setEstablishments] = useState<EstablishmentQuery[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);
    const [loading, setLoading] = useState(false);

    const mockParkingEstablishments: ParkingEstablishment[] = [
        {
            access_info: "Gate on 2nd Street",
            accessibility: "Wheelchair Accessible",
            created_at: "2023-09-01T08:00:00Z",
            custom_access: "VIP Access Only",
            custom_layout: "Level-based",
            dimensions: "10x20",
            establishment_id: 1,
            facilities: "Elevator, CCTV, Security Guard",
            is24_7: true,
            latitude: 34.0522,
            lighting: "Bright LED",
            longitude: -118.2437,
            name: "Downtown Parking",
            nearby_landmarks: "City Hall, Central Park",
            profile_id: 101,
            space_layout: "Row-based",
            space_type: "Covered",
            updated_at: "2023-09-01T09:00:00Z",
            uuid: "abc123",
            verified: true,
        },
        {
            access_info: "Entrance via Main Street",
            accessibility: "Limited Access",
            created_at: "2023-08-20T10:30:00Z",
            custom_access: "Tenant Only",
            custom_layout: "Multi-level",
            dimensions: "12x22",
            establishment_id: 2,
            facilities: "Security Cameras, Electric Charging",
            is24_7: false,
            latitude: 40.7128,
            lighting: "Standard",
            longitude: -74.006,
            name: "Liberty Garage",
            nearby_landmarks: "Statue of Liberty, Pier 17",
            profile_id: 102,
            space_layout: "Stacked",
            space_type: "Open",
            updated_at: "2023-08-21T12:00:00Z",
            uuid: "def456",
            verified: false,
        },
        {
            access_info: "Side entrance on Elm Ave",
            accessibility: "Wheelchair Accessible",
            created_at: "2023-07-15T14:00:00Z",
            custom_access: "Members Only",
            custom_layout: "Flat ground",
            dimensions: "9x18",
            establishment_id: 3,
            facilities: "EV Charging, Covered Parking",
            is24_7: true,
            latitude: 37.7749,
            lighting: "Bright LED",
            longitude: -122.4194,
            name: "Bay Area Parking",
            nearby_landmarks: "Golden Gate Bridge",
            profile_id: 103,
            space_layout: "Row-based",
            space_type: "Outdoor",
            updated_at: "2023-07-16T08:00:00Z",
            uuid: "ghi789",
            verified: true,
        },
        {
            access_info: "Through residential complex",
            accessibility: "No wheelchair access",
            created_at: "2023-06-01T09:00:00Z",
            custom_access: "Staff Only",
            custom_layout: "Single-level",
            dimensions: "8x15",
            establishment_id: 4,
            facilities: "Minimal lighting",
            is24_7: false,
            latitude: 51.5074,
            lighting: "Dim",
            longitude: -0.1278,
            name: "London Central Parking",
            nearby_landmarks: "Big Ben, London Eye",
            profile_id: 104,
            space_layout: "Flat",
            space_type: "Basement",
            updated_at: "2023-06-02T12:00:00Z",
            uuid: "jkl012",
            verified: false,
        },
        {
            access_info: "Main gate next to supermarket",
            accessibility: "Wheelchair Accessible",
            created_at: "2023-08-10T07:00:00Z",
            custom_access: "Open to public",
            custom_layout: "Levels A, B, C",
            dimensions: "10x19",
            establishment_id: 5,
            facilities: "Security, CCTV, Washroom",
            is24_7: true,
            latitude: 48.8566,
            lighting: "Fluorescent",
            longitude: 2.3522,
            name: "Paris Underground Parking",
            nearby_landmarks: "Louvre, River Seine",
            profile_id: 105,
            space_layout: "Multi-level",
            space_type: "Covered",
            updated_at: "2023-08-11T11:00:00Z",
            uuid: "mno345",
            verified: true,
        },
    ];

    const animation = new Animated.Value(0);

    const handleSearch = async () => {
        setLoading(true);
        // Implement your search API call here
        setLoading(false);
    };

    const expandSearchBar = () => {
        setModalVisible(true);
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
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
            setLocation({
                latitude: 14.5995,
                longitude: 120.9842,
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={expandSearchBar}>
                    <View style={styles.searchBarContainer}>
                        <View style={styles.searchBar}>
                            <MaterialCommunityIcons name="magnify" size={20} color="#4b5563" />
                            <TextComponent style={styles.searchText}>Where to park?</TextComponent>
                        </View>
                    </View>
                </Pressable>

                <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                            </Pressable>
                            <TextInputComponent
                                customStyles={styles.modalSearchInput}
                                placeholder="Search parking locations"
                                value={searchTerm}
                                onChangeText={setSearchTerm}
                                autoFocus
                            />
                        </View>

                        <ScrollView style={styles.modalContent}>
                            {recentSearches.map((search, index) => (
                                <ButtonComponent
                                    key={index}
                                    style={styles.recentSearchItem}
                                    onPress={() => {
                                        setSearchTerm(search);
                                        handleSearch();
                                        setModalVisible(false);
                                    }}
                                >
                                    <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="#6b7280" />
                                    <TextComponent style={styles.recentSearchText}>{search}</TextComponent>
                                </ButtonComponent>
                            ))}
                        </ScrollView>
                    </View>
                </Modal>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content}>
                {loading ? (
                    <View style={styles.loadingContainer}>{/* Loading indicator */}</View>
                ) : mockParkingEstablishments.length === 0 ? (
                    <View style={styles.noResults}>{/* No results UI */}</View>
                ) : (
                    <View style={styles.results}>
                        {mockParkingEstablishments.map((establishment) => (
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
    searchBarContainer: {
        marginTop: 8,
        paddingHorizontal: 16,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "white",
        borderRadius: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    searchText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#4b5563",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: PlatformType() === "ios" ? 40 : 0,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    modalSearchInput: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
    },
    modalContent: {
        flex: 1,
    },
    recentSearchItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    recentSearchText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#111827",
    },
});
