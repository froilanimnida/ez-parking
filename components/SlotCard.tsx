import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import type { ParkingSlot } from "@/lib/models/parking-slot";
import type { PricingPlan } from "@/lib/models/pricing-plan";
import LinkComponent from "./LinkComponent";

interface Slot extends ParkingSlot {
    vehicle_type_code: string;
    vehicle_type_name: string;
    vehicle_type_size: string;
}

interface SlotCardProps {
    slotInfo: Slot;
    rates: PricingPlan[];
    establishmentUuid: string;
    slotUuid: string;
}

const getRateDisplay = (baseRate: number, rates: { rate: number; rate_type: string; is_enabled: boolean }[]) => {
    const activeRate = rates.find((r) => r.is_enabled);
    if (!activeRate) return { amount: "0.00", type: "hourly" };

    const calculatedRate = baseRate * Number(activeRate.rate);
    return {
        amount: calculatedRate.toFixed(2),
        type: activeRate.rate_type,
    };
};

const SlotCard = ({ slotInfo, rates, establishmentUuid, slotUuid }: SlotCardProps) => {
    const { amount, type } = getRateDisplay(slotInfo.base_rate, rates);

    return (
        <CardComponent
            customStyles={[
                styles.card,
                slotInfo.slot_status === "open" && styles.borderOpen,
                slotInfo.slot_status === "reserved" && styles.borderReserved,
                slotInfo.slot_status === "occupied" && styles.borderOccupied,
            ]}
            header={`Slot - ${slotInfo.slot_code}`}
        >
            <View style={styles.header}>
                <TextComponent variant="h3">{slotInfo.slot_code}</TextComponent>
                <View
                    style={[
                        styles.statusBadge,
                        slotInfo.slot_status === "open" && styles.statusOpen,
                        slotInfo.slot_status === "reserved" && styles.statusReserved,
                        slotInfo.slot_status === "occupied" && styles.statusOccupied,
                    ]}
                >
                    <TextComponent style={styles.statusText}>{slotInfo.slot_status}</TextComponent>
                </View>
            </View>

            <View style={styles.details}>
                <TextComponent style={styles.detailText}>Floor: {slotInfo.floor_level}</TextComponent>
                <TextComponent style={styles.detailText}>Accommodates: {slotInfo.vehicle_type_name}</TextComponent>
                <TextComponent style={styles.detailText}>Size: {slotInfo.vehicle_type_size}</TextComponent>

                {slotInfo.slot_status === "open" && (
                    <View style={styles.rateContainer}>
                        <TextComponent style={styles.rateText}>
                            ₱{amount}/{type === "hourly" ? "hr" : type === "daily" ? "day" : "mo"}
                        </TextComponent>
                        <TextComponent style={styles.rateType}>{type} rate</TextComponent>
                    </View>
                )}

                {slotInfo.slot_status === "open" && (
                    <LinkComponent
                        href={`./../auth/login?next=${encodeURIComponent(
                            `/user/book/${establishmentUuid}/${slotUuid}`
                        )}`}
                        asChild
                    >
                        <TouchableOpacity style={styles.bookButton}>
                            <TextComponent style={styles.bookButtonText}>Book this slot</TextComponent>
                        </TouchableOpacity>
                    </LinkComponent>
                )}

                {slotInfo.is_premium && (
                    <View style={styles.premiumBadge}>
                        <TextComponent style={styles.premiumText}>Premium</TextComponent>
                    </View>
                )}
            </View>
        </CardComponent>
    );
};

export default SlotCard;

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
    },
    borderOpen: {
        borderLeftColor: "#10B981",
    },
    borderReserved: {
        borderLeftColor: "#F59E0B",
    },
    borderOccupied: {
        borderLeftColor: "#EF4444",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusOpen: {
        backgroundColor: "#D1FAE5",
    },
    statusReserved: {
        backgroundColor: "#FEF3C7",
    },
    statusOccupied: {
        backgroundColor: "#FEE2E2",
    },
    statusText: {
        color: "#065F46",
        fontSize: 12,
    },
    details: {
        gap: 8,
    },
    detailText: {
        color: "#6B7280",
    },
    rateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },
    rateText: {
        color: "#10B981",
        fontWeight: "bold",
    },
    rateType: {
        color: "#6B7280",
        fontSize: 12,
    },
    bookButton: {
        backgroundColor: "#10B981",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    bookButtonText: {
        color: "white",
        textAlign: "center",
    },
    premiumBadge: {
        backgroundColor: "#E9D5FF",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
    },
    premiumText: {
        color: "#7C3AED",
        fontSize: 12,
    },
});
