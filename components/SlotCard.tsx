import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ParkingSlot } from "@lib/models/parkingSlot";
import CardComponent from "./CardComponent";
import TextComponent from "./TextComponent";
import LinkComponent from "./LinkComponent";
import { type RelativePathString } from "expo-router";

interface Slot extends ParkingSlot {
    vehicle_type_code: string;
    vehicle_type_name: string;
    vehicle_type_size: string;
}

interface SlotCardProps {
    slotInfo: Slot;
    slotUuid: string;
    isGuest?: boolean;
    establishmentUuid: string;
}

const SlotCard = ({ slotInfo, slotUuid, isGuest, establishmentUuid }: SlotCardProps) => {
    const getBorderColor = () => {
        switch (slotInfo.slot_status) {
            case "open":
                return styles.borderOpen;
            case "reserved":
                return styles.borderReserved;
            default:
                return styles.borderOccupied;
        }
    };

    const getStatusBadgeStyle = () => {
        switch (slotInfo.slot_status) {
            case "open":
                return [styles.statusBadge, styles.statusOpen];
            case "reserved":
                return [styles.statusBadge, styles.statusReserved];
            default:
                return [styles.statusBadge, styles.statusOccupied];
        }
    };

    return (
        <CardComponent customStyles={[getBorderColor()]} header={slotInfo.slot_code}>
            <View style={styles.header}>
                <TextComponent style={getStatusBadgeStyle()}>{slotInfo.slot_status}</TextComponent>
                {slotInfo.is_premium && <Text style={styles.premiumBadge}>Premium</Text>}
            </View>
            <View style={styles.infoContainer}>
                <TextComponent style={styles.infoText}>Floor: {slotInfo.floor_level}</TextComponent>
                <TextComponent style={styles.infoText}>Type: {slotInfo.vehicle_type_name}</TextComponent>
                <TextComponent style={styles.infoText}>Size: {slotInfo.vehicle_type_size}</TextComponent>

                {slotInfo.slot_status === "open" && (
                    <>
                        <View style={styles.rateRow}>
                            <View style={styles.rateContainer}>
                                <TextComponent style={styles.rateText}>PHP{slotInfo.base_price_per_hour}</TextComponent>
                                <TextComponent style={styles.rateTypeText}>/ hour</TextComponent>
                            </View>
                            {Number(slotInfo.base_price_per_day) > 0 && (
                                <View style={styles.rateContainer}>
                                    <TextComponent style={styles.rateText}>
                                        PHP{slotInfo.base_price_per_day}
                                    </TextComponent>
                                    <TextComponent style={styles.rateTypeText}>/ day</TextComponent>
                                </View>
                            )}
                            {Number(slotInfo.base_price_per_month) > 0 && (
                                <View style={styles.rateContainer}>
                                    <TextComponent style={styles.rateText}>
                                        PHP{slotInfo.base_price_per_month}
                                    </TextComponent>
                                    <TextComponent style={styles.rateTypeText}>/ month</TextComponent>
                                </View>
                            )}
                        </View>

                        <LinkComponent
                            style={styles.bookButton}
                            label="Book Slot"
                            href={
                                isGuest
                                    ? (`../auth/login?next=${encodeURIComponent(
                                          `/user/book/slot/${slotUuid}?establishment_uuid=${establishmentUuid}`,
                                      )}` as RelativePathString)
                                    : (`/user/book/slot/${slotUuid}?establishment_uuid=${establishmentUuid}` as RelativePathString)
                            }
                        />
                    </>
                )}
            </View>
        </CardComponent>
    );
};
const styles = StyleSheet.create({
    borderOpen: {
        borderLeftColor: "#16a34a", // Green for available
        borderLeftWidth: 6,
    },
    borderReserved: {
        borderLeftColor: "#f59e0b", // Orange for reserved
        borderLeftWidth: 6,
    },
    borderOccupied: {
        borderLeftColor: "#dc2626", // Red for occupied
        borderLeftWidth: 6,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    statusBadge: {
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 12,
        fontWeight: "600",
        textTransform: "capitalize",
        overflow: "hidden",
    },
    statusOpen: {
        backgroundColor: "#dcfce7",
        color: "#166534",
    },
    statusReserved: {
        backgroundColor: "#fef9c3",
        color: "#713f12",
    },
    statusOccupied: {
        backgroundColor: "#fee2e2",
        color: "#991b1b",
    },
    infoContainer: {
        marginTop: 10,
        paddingHorizontal: 16,
    },
    infoText: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 6,
    },
    rateRow: {
        flexDirection: "column",
        gap: 6,
        marginTop: 10,
    },
    rateContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    rateText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#16a34a",
    },
    rateTypeText: {
        fontSize: 12,
        color: "#6b7280",
        textTransform: "capitalize",
    },
    bookButton: {
        marginTop: 12,
        backgroundColor: "#16a34a",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "100%",
    },
    bookButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold",
    },
    premiumBadge: {
        backgroundColor: "#f3e8ff",
        color: "#6b21a8",
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        alignSelf: "flex-start", // Prevents stretching
        fontWeight: "bold",
    },
});

export default SlotCard;
