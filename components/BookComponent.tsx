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
import { getNearbyEstablishments } from "@/lib/api/establishment";
import { askLocationPermission, getIPBasedLocation } from "@/lib/location";
import LoadingComponent from "./reusable/LoadingComponent";
export interface EstablishmentQuery extends ParkingEstablishment {
    open_slots: number;
    total_slots: number;
    reserved_slot: number;
    occupied_slots: number;
    pricing_plans: PricingPlan[];
}

const getNearestEstablishments = async (latitude: number, longitude: number) =>
    await getNearbyEstablishments(latitude, longitude);

export default function EstablishmentSearch() {
    const [establishments, setEstablishments] = useState<EstablishmentQuery[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);
    const [loading, setLoading] = useState(true);

    const animation = new Animated.Value(0);

    const handleSearch = async () => {
        setLoading(true);

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
            let status = await askLocationPermission();
            if (!status) {
                const data = await getIPBasedLocation();
                setLocation({ latitude: data.latitude, longitude: data.longitude });
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.BestForNavigation,
                });
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                const data = await getIPBasedLocation();
                setLocation({ latitude: data.latitude, longitude: data.longitude });
            }
            const data = await getNearestEstablishments(location.latitude, location.longitude);
            setEstablishments(data.data.establishments);
            setLoading(false);
        })();
    }, []);

    return (
        <View style={{ flex: 1, gap: 16 }}>
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
                    <LoadingComponent text="Searching for nearby parking establishments..." />
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
    header: {
        backgroundColor: "white",
        padding: 16,
        paddingTop: 48,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: 8,
        elevation: 5,
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
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        elevation: 4,
    },
    searchText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#4b5563",
    },
    modalContainer: {
        flex: 1,
        borderRadius: 16,
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
