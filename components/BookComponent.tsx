import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Animated, Modal, Pressable } from "react-native";
import EstablishmentItem from "@/components/EstablishmentItem";
import TextComponent from "@/components/TextComponent";
import type { ParkingEstablishment } from "@/lib/models/parking-establishment";
import type { PricingPlan } from "@/lib/models/pricing-plan";
import TextInputComponent from "@/components/TextInputComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlatformType from "@lib/helper/platform";
import { getNearbyEstablishments } from "@/lib/api/establishment";
import { askLocationPermission, getIPBasedLocation, getUserLocation } from "@lib/helper/location";
import LoadingComponent from "./reusable/LoadingComponent";
import SelectComponent from "./SelectComponent";
import { METRO_MANILA_CITIES } from "@/lib/models/cities";
import type { CITY } from "@/lib/types/models/common/constants";

export interface EstablishmentQuery extends ParkingEstablishment {
    open_slots: number;
    total_slots: number;
    reserved_slot: number;
    occupied_slots: number;
    pricing_plans: PricingPlan[];
}

const EstablishmentSearch = ({ guest }: { guest: boolean }) => {
    const [establishments, setEstablishments] = useState<EstablishmentQuery[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState<CITY>("");
    const [selectedCity, setSelectedCity] = useState("");
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
        const fetchData = async () => {
            let status = await askLocationPermission();
            if (!status) {
                const data = await getIPBasedLocation();
                setLocation({ latitude: data.latitude, longitude: data.longitude });
            }

            try {
                let location = await getUserLocation();
                location ? setLocation(location) : setLocation({ latitude: 14.5995, longitude: 120.9842 });
            } catch (error) {
                const data = await getIPBasedLocation();
                setLocation({ latitude: data.latitude, longitude: data.longitude });
            } finally {
                const data = await getNearbyEstablishments(location.latitude, location.longitude);
                setEstablishments(data.data.establishments);
                setLoading(false);
            }
        };
        fetchData().then();
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
                            <Pressable onPress={() => setModalVisible(false)} style={styles.backButton}>
                                <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                            </Pressable>
                            <View style={styles.citySelectContainer}>
                                <TextInputComponent
                                    placeholder="Search parking locations"
                                    value={searchTerm}
                                    onChangeText={setSearchTerm}
                                    autoFocus
                                />
                            </View>
                            <SelectComponent
                                items={METRO_MANILA_CITIES.map((city) => ({ label: city.toLowerCase(), value: city }))}
                                selectedValue={selectedCity}
                                onValueChange={(city) => {
                                    setSelectedCity(city);
                                }}
                                placeholder="Select City"
                            />
                        </View>
                        <ScrollView style={styles.modalContent}>
                            {recentSearches.map((search, index) => (
                                <Pressable
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
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </Modal>
            </View>

            {loading ? (
                <LoadingComponent text="Searching for nearby parking establishments..." />
            ) : establishments.length === 0 ? (
                <View style={styles.noResults}>
                    <MaterialCommunityIcons name={"car"} size={64} color={"#6b7280"} />
                    <TextComponent style={{ textAlign: "center" }}>
                        No parking establishments found nearby
                    </TextComponent>
                </View>
            ) : (
                <View style={styles.results}>
                    {establishments.map((establishment) => (
                        <EstablishmentItem
                            guest={guest}
                            key={establishment.establishment_id}
                            establishment={establishment}
                            userLat={location.latitude}
                            userLong={location.longitude}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

export default EstablishmentSearch;

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
    citySelectContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    backButton: {
        position: "absolute",
        left: 16,
        top: 16,
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
        flexDirection: "column",
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
