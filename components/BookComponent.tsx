import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import EstablishmentItem from "@/components/EstablishmentItem";
import TextComponent from "@/components/TextComponent";
import type { ParkingEstablishment } from "@lib/models/parkingEstablishment";
import TextInputComponent from "@/components/TextInputComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PlatformType from "@lib/helper/platform";
import { searchEstablishments } from "@/lib/api/establishment";
import { askLocationPermission, getIPBasedLocation, getUserLocation } from "@lib/helper/location";
import LoadingComponent from "./reusable/LoadingComponent";
import SelectComponent from "./SelectComponent";
import { METRO_MANILA_CITIES } from "@/lib/types/models/common/constants";
import type { CITY } from "@/lib/types/models/common/constants";
import ButtonComponent from "@components/ButtonComponent";

export interface EstablishmentQuery extends ParkingEstablishment {
    open_slots: number;
    total_slots: number;
    reserved_slot: number;
    occupied_slots: number;
}

const EstablishmentSearch = ({ guest }: { guest: boolean }) => {
    const [establishments, setEstablishments] = useState<EstablishmentQuery[]>([]);
    const [searchTerm, setSearchTerm] = useState<CITY>("");
    const [selectedCity, setSelectedCity] = useState("manila");
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState({
        latitude: 14.5995,
        longitude: 120.9842,
    });

    const fetchEstablishments = async () => {
        setLoading(true);
        try {
            const data = await searchEstablishments(location.latitude, location.longitude, searchTerm, selectedCity);
            setEstablishments(data.data.establishments);
        } catch (error) {
            alert("Error fetching establishments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            let status = await askLocationPermission();
            if (!status) {
                const data = await getIPBasedLocation();
                setLocation({ latitude: data.latitude, longitude: data.longitude });
            }

            try {
                let location = await getUserLocation();
                location ? setLocation({ latitude: location.latitude, longitude: location.longitude }) : null;
            } catch (error) {
                const data = await getIPBasedLocation();
                setLocation({ latitude: data.latitude, longitude: data.longitude });
            } finally {
                fetchEstablishments().then();
            }
        };
        fetchData().then();
    }, []);

    return (
        <View style={{ flex: 1, gap: 16 }}>
            <View style={styles.header}>
                <TextComponent style={{ fontSize: 24, fontWeight: "600" }}>Find Parking</TextComponent>
                <View style={styles.searchBarContainer}>
                    <View style={styles.formGroup}>
                        <TextComponent variant="label">Location</TextComponent>
                        <TextInputComponent placeholder={"Where to park"} onChangeText={setSearchTerm} />
                    </View>
                    <View style={styles.formGroup}>
                        <TextComponent variant="label">City</TextComponent>
                        <SelectComponent
                            items={METRO_MANILA_CITIES.map((city) => ({
                                label: city,
                                value: city.toLowerCase(),
                            }))}
                            selectedValue={selectedCity}
                            onValueChange={(city) => {
                                setSelectedCity(city);
                            }}
                        />
                    </View>
                </View>
                <ButtonComponent onPress={fetchEstablishments} title="Search" />
            </View>

            {loading ? (
                <LoadingComponent text="Searching for nearby parking establishments..." />
            ) : establishments.length === 0 ? (
                <View style={styles.noResults}>
                    <MaterialCommunityIcons name={"car"} size={64} color={"#6b7280"} />
                    <TextComponent style={{ textAlign: "center" }}>No parking establishments found...</TextComponent>
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
        width: "100%",
        flexDirection: "row",
        gap: 16,
        flex: 1,
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
    formGroup: {
        gap: 8,
        flex: 1,
    },
});
