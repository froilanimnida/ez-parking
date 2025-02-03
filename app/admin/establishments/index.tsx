import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axiosInstance from "@/lib/axiosInstance";
import { getAuthHeaders } from "@/lib/credentialsManager";
import SelectComponent from "@/components/SelectComponent";
import TextInputComponent from "@/components/TextInputComponent";
import { defaultBodyStyles, defaultContainerStyles } from "@/styles/default";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

interface Establishment {
    company_profile: {
        company_name: string;
        company_reg_number: string;
    };
    establishment: {
        name: string;
        verified: boolean;
        latitude: number;
        longitude: number;
        space_type: string;
        space_layout: string;
        is24_7: boolean;
        nearby_landmarks: string;
        created_at: string;
        uuid: string;
    };
}

const fetchEstablishments = async () => {
    const cookiesObject = await getAuthHeaders();

    const res = await axiosInstance.get(`${process.env.EXPO_PUBLIC_API_ADMIN_ROOT}/establishments`, {
        headers: {
            Authorization: cookiesObject.Authorization,
            "X-CSRF-TOKEN": cookiesObject["X-CSRF-TOKEN"],
            csrf_refresh_token: cookiesObject.csrf_refresh_token,
            refresh_token_cookie: cookiesObject.refresh_token_cookie,
        },
    });
    return res;
};

const Establishments = () => {
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected" | string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    let establishments: Establishment[] = [];
    useEffect(() => {
        const res = fetchEstablishments();
        res.then((data) => {
            establishments = data.data as Establishment[];
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    return (
        <ResponsiveContainer>
            <View style={styles.header}>
                <TextComponent bold variant="h1">
                    Parking Establishments
                </TextComponent>
            </View>

            <View style={styles.filters}>
                <View style={styles.filterContainer}>
                    <SelectComponent
                        items={[
                            {
                                label: "All Status",
                                value: "all",
                            },
                            {
                                label: "Pending",
                                value: "pending",
                            },
                            {
                                label: "Approved",
                                value: "approved",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                        onValueChange={setStatusFilter}
                        selectedValue={statusFilter}
                    />
                </View>
                <TextInputComponent
                    customStyles={styles.searchInput}
                    placeholder="Search establishments..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View style={styles.grid}>
                {establishments.map((establishment, index) => (
                    <CardComponent key={index} customStyles={styles.card} header="Establishment Details">
                        <View style={styles.cardHeader}>
                            <TextComponent variant="h3">{establishment.establishment.name}</TextComponent>
                            <View
                                style={[
                                    styles.badge,
                                    establishment.establishment.verified ? styles.badgeSuccess : styles.badgePending,
                                ]}
                            >
                                <TextComponent style={styles.badgeText}>
                                    {establishment.establishment.verified ? "Approved" : "Pending"}
                                </TextComponent>
                            </View>
                        </View>

                        <View style={styles.cardContent}>
                            <View style={styles.locationRow}>
                                <MaterialCommunityIcons name="map-marker" size={20} color="#9CA3AF" />
                                <TextComponent style={styles.locationText}>
                                    Lat: {establishment.establishment.latitude}, Long:{" "}
                                    {establishment.establishment.longitude}
                                </TextComponent>
                            </View>

                            <View style={styles.infoGrid}>
                                <View style={styles.infoItem}>
                                    <TextComponent style={styles.infoLabel}>Space Type</TextComponent>
                                    <TextComponent>{establishment.establishment.space_type}</TextComponent>
                                </View>
                                <View style={styles.infoItem}>
                                    <TextComponent style={styles.infoLabel}>Layout</TextComponent>
                                    <TextComponent>{establishment.establishment.space_layout}</TextComponent>
                                </View>
                            </View>

                            <Link href={`/admin/establishments/${establishment.establishment.uuid}`}>View Details</Link>
                        </View>
                    </CardComponent>
                ))}
            </View>
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 16,
    },
    subtitle: {
        color: "#6B7280",
        marginTop: 4,
    },
    filters: {
        padding: 16,
        flexDirection: "column",
        gap: 12,
    },
    filterContainer: {
        flex: 1,
    },
    picker: {
        backgroundColor: "white",
        borderRadius: 8,
    },
    searchInput: {
        flex: 2,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    grid: {
        padding: 16,
        gap: 16,
    },
    card: {
        padding: 16,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeSuccess: {
        backgroundColor: "#D1FAE5",
    },
    badgePending: {
        backgroundColor: "#FEF3C7",
    },
    badgeText: {
        fontSize: 12,
    },
    cardContent: {
        gap: 16,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    locationText: {
        color: "#6B7280",
        fontSize: 14,
    },
    infoGrid: {
        flexDirection: "row",
        gap: 16,
    },
    infoItem: {
        flex: 1,
    },
    infoLabel: {
        color: "#6B7280",
        fontSize: 12,
        marginBottom: 4,
    },
    viewButton: {
        marginTop: 16,
    },
});

export default Establishments;
