import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import calculateDistance from "@/lib/function/calculateDistance";
import LinkComponent from "./LinkComponent";
import type { ParkingEstablishment } from "@/lib/models/parking-establishment";

interface EstablishmentItem {
    establishment: ParkingEstablishment & {
        verified: boolean;
        open_slots: number;
        total_slots: number;
    };
}

interface EstablishmentItemProps extends EstablishmentItem {
    userLat: number;
    userLong: number;
    guest: boolean;
}

const EstablishmentItem = ({ userLat, userLong, establishment, guest }: EstablishmentItemProps) => {
    const distance = calculateDistance(userLat, userLong, establishment.latitude, establishment.longitude);

    return (
        <CardComponent header={`Establishment - ${establishment.name}`} subHeader={establishment.nearby_landmarks}>
            <View style={styles.header}>
                {establishment.verified && (
                    <View style={styles.badge}>
                        <TextComponent style={styles.badgeText}>Verified</TextComponent>
                    </View>
                )}
            </View>

            <View style={styles.details}>
                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="ruler" size={20} color="#6B7280" />
                    <TextComponent style={styles.detailText}>{establishment.dimensions}</TextComponent>
                </View>
                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="car" size={20} color="#6B7280" />
                    <TextComponent style={styles.detailText}>
                        {establishment.space_type} - {establishment.space_layout}
                    </TextComponent>
                </View>
                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="lightbulb" size={20} color="#6B7280" />
                    <TextComponent style={styles.detailText}>{establishment.lighting}</TextComponent>
                </View>
                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="map-marker-distance" size={20} color="#6B7280" />
                    <TextComponent style={styles.detailText}>{distance.toFixed(1)} km away</TextComponent>
                </View>
            </View>

            {establishment.facilities && (
                <View style={styles.facilities}>
                    {establishment.facilities.split(",").map((facility, index) => (
                        <View key={index} style={styles.facilityBadge}>
                            <TextComponent style={styles.facilityText}>{facility.trim()}</TextComponent>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.footer}>
                <TextComponent style={styles.slots}>
                    <TextComponent style={styles.slotsAvailable}>{establishment.open_slots}</TextComponent>/
                    {establishment.total_slots} slots available
                </TextComponent>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.directionsButton}
                        onPress={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${establishment.latitude},${establishment.longitude}`;
                            window.open(url, "_blank");
                        }}
                    >
                        <TextComponent style={styles.directionsText}>Directions</TextComponent>
                    </TouchableOpacity>
                    {guest ? (
                        <LinkComponent href={`../establishment/${establishment.uuid}`} asChild>
                            <TouchableOpacity style={styles.detailsButton}>
                                <TextComponent style={styles.detailsText}>View Details</TextComponent>
                            </TouchableOpacity>
                        </LinkComponent>
                    ) : (
                        <LinkComponent href={`../../user/book/${establishment.uuid}`} asChild>
                            <TouchableOpacity style={styles.detailsButton}>
                                <TextComponent style={styles.detailsText}>Book Now</TextComponent>
                            </TouchableOpacity>
                        </LinkComponent>
                    )}
                </View>
            </View>
        </CardComponent>
    );
};

export default EstablishmentItem;

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    subtitle: {
        color: "#6B7280",
        marginTop: 4,
    },
    badge: {
        backgroundColor: "#D1FAE5",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: "#065F46",
        fontSize: 12,
    },
    details: {
        flexDirection: "column",
        gap: 8,
        marginBottom: 16,
    },
    detailColumn: {
        flex: 1,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    detailText: {
        marginLeft: 8,
        color: "#6B7280",
    },
    facilities: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
    },
    facilityBadge: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    facilityText: {
        color: "#6B7280",
        fontSize: 12,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingTop: 16,
    },
    slots: {
        color: "#6B7280",
    },
    slotsAvailable: {
        color: "#10B981",
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
        gap: 8,
    },
    directionsButton: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    directionsText: {
        color: "#374151",
    },
    detailsButton: {
        backgroundColor: "#4F46E5",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    detailsText: {
        color: "white",
    },
});
