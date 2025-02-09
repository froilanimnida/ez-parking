import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ParkingSlot } from "@/lib/models/parking-slot";
import CardComponent from "./CardComponent";
import TextComponent from "./TextComponent";
import LinkComponent from "./LinkComponent";
import { usePathname, type RelativePathString } from "expo-router";

interface Slot extends ParkingSlot {
    vehicle_type_code: string;
    vehicle_type_name: string;
    vehicle_type_size: string;
}

interface SlotCardProps {
    slotInfo: Slot;
    establishmentUuid: string;
    slotUuid: string;
    isGuest?: boolean;
}

const SlotCard = ({ slotInfo, establishmentUuid, slotUuid, isGuest }: SlotCardProps) => {
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
            </View>
            <View style={styles.infoContainer}>
                <TextComponent style={styles.infoText}>Floor: {slotInfo.floor_level}</TextComponent>
                <TextComponent style={styles.infoText}>Accommodates: {slotInfo.vehicle_type_name}</TextComponent>
                <TextComponent style={styles.infoText}>Size: {slotInfo.vehicle_type_size}</TextComponent>

                {slotInfo.slot_status === "open" && (
                    <>
                        <View style={styles.rateRow}>
                            <View style={styles.rateContainer}>
                                <TextComponent style={styles.rateText}>PHP{slotInfo.base_price_per_hour}</TextComponent>
                                <TextComponent style={styles.rateTypeText}>per hour</TextComponent>
                            </View>
                            <View style={styles.rateContainer}>
                                <TextComponent style={styles.rateText}>PHP{slotInfo.base_price_per_day}</TextComponent>
                                <TextComponent style={styles.rateTypeText}>per day</TextComponent>
                            </View>
                            <View style={styles.rateContainer}>
                                <TextComponent style={styles.rateText}>
                                    PHP{slotInfo.base_price_per_month}
                                </TextComponent>
                                <TextComponent style={styles.rateTypeText}>per month</TextComponent>
                            </View>
                        </View>

                        <LinkComponent
                            style={styles.bookButton}
                            href={
                                isGuest
                                    ? `../auth/login?next=${encodeURIComponent(`/user/book/slot/${slotUuid}`)}`
                                    : (`/user/book/slot/${slotUuid}` as RelativePathString)
                            }
                        >
                            Book this slot
                        </LinkComponent>
                    </>
                )}

                {slotInfo.is_premium && <Text style={styles.premiumBadge}>Premium</Text>}
            </View>
        </CardComponent>
    );
};

const styles = StyleSheet.create({
    borderOpen: {
        borderLeftColor: "green",
    },
    borderReserved: {
        borderLeftColor: "orange",
    },
    borderOccupied: {
        borderLeftColor: "red",
    },
    header: {
        flexDirection: "row",
        marginBottom: 8,
    },
    rateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },
    slotCode: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
    statusBadge: {
        borderRadius: 16,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 12,
        fontWeight: "600",
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
        marginTop: 8,
    },
    infoText: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 4,
    },
    rateRow: {
        flexDirection: "column",
        marginTop: 8,
    },
    rateText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#16a34a",
    },
    rateTypeText: {
        fontSize: 12,
        color: "#6b7280",
        textTransform: "capitalize",
    },
    bookButton: {
        marginTop: 8,
        backgroundColor: "#16a34a",
        borderRadius: 4,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "100%",
    },
    bookButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "600",
    },
    premiumBadge: {
        marginTop: 8,
        backgroundColor: "#f3e8ff",
        color: "#6b21a8",
        fontSize: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
        alignSelf: "flex-start",
    },
});

export default SlotCard;
