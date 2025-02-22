import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { type RelativePathString } from "expo-router";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SelectComponent from "@/components/SelectComponent";
import TextInputComponent from "@/components/TextInputComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { getEstablishments } from "@/lib/api/admin";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import LinkComponent from "@/components/LinkComponent";
import type { ParkingEstablishment } from "@lib/models/parkingEstablishment";
import type { CompanyProfile } from "@lib/models/companyProfile";
import { ADMIN_ESTABLISHMENT_FILTERS } from "@/lib/types/models/common/constants";

interface Establishment {
    company_profile: CompanyProfile;
    establishment: ParkingEstablishment;
}

const Establishments = () => {
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [establishments, setEstablishments] = useState<Establishment[]>([]);
    const [filteredEstablishments, setFilteredEstablishments] = useState<Establishment[]>([]);

    useEffect(() => {
        const getEstablishmentData = async () => {
            const res = await getEstablishments();
            const data = res.data.data as Establishment[];
            setEstablishments(data);
            setFilteredEstablishments(data);
            setLoading(false);
        };
        getEstablishmentData().then();
    }, []);

    useEffect(() => {
        const filtered = establishments.filter((establishment) => {
            const matchesSearch = establishment.establishment.name.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "approved" && establishment.establishment.verified) ||
                (statusFilter === "pending" && !establishment.establishment.verified);

            return matchesSearch && matchesStatus;
        });

        setFilteredEstablishments(filtered);
    }, [searchQuery, statusFilter, establishments]);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const handleFilter = (value: string) => {
        setStatusFilter(value);
    };

    return (
        <ResponsiveContainer>
            <LinkComponent label="← Back to Dashboard" style={{ width: "auto", marginBottom: 16 }} href="../" />
            <View style={styles.header}>
                <TextComponent bold variant="h1">
                    Parking Establishments
                </TextComponent>
            </View>

            <View style={styles.filters}>
                <View style={styles.filterContainer}>
                    <SelectComponent
                        items={ADMIN_ESTABLISHMENT_FILTERS.map((filter) => {
                            return { label: filter.toUpperCase(), value: filter };
                        })}
                        onValueChange={handleFilter}
                        selectedValue={statusFilter}
                    />
                </View>
                <TextInputComponent
                    placeholder="Search establishments..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            <View style={styles.grid}>
                {loading && establishments.length === 0 && <LoadingComponent text="Fetching establishments..." />}
                {!loading && filteredEstablishments.length === 0 && (
                    <TextComponent style={styles.noResults}>No establishments found</TextComponent>
                )}
                {filteredEstablishments.map((establishment, index) => (
                    <CardComponent key={index} customStyles={styles.card} header={establishment.establishment.name}>
                        <View style={styles.cardHeader}>
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

                            <LinkComponent
                                label="View Details"
                                href={`/admin/establishments/${establishment.establishment.uuid}` as RelativePathString}
                            />
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
    noResults: {
        textAlign: "center",
        color: "#6B7280",
        padding: 16,
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
