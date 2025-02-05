import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { PricingPlan } from "@/lib/models/pricing-plan";
import { ParkingSlot } from "@/lib/models/parking-slot";

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

function getRateDisplay(baseRate: number, rates: PricingPlan[]): { amount: string; type: string } {
    const activeRate = rates.find((r) => r.is_enabled);
    if (!activeRate) return { amount: "0.00", type: "hourly" };

    const calculatedRate = baseRate * Number(activeRate.rate);
    return {
        amount: calculatedRate.toFixed(2),
        type: activeRate.rate_type,
    };
}

const SlotCard: React.FC<SlotCardProps> = ({ slotInfo, rates, establishmentUuid, slotUuid }) => {
    const { amount, type } = getRateDisplay(slotInfo.base_rate, rates);

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

    const handleBookSlot = () => {
        const nextUrl = `/user/book/${establishmentUuid}?slot=${slotUuid}`;
        const loginUrl = `/auth/login?next=${encodeURIComponent(nextUrl)}`;
        Linking.openURL(loginUrl);
    };

    return (
        <View style={[styles.container, getBorderColor()]}>
            <View style={styles.header}>
                <Text style={styles.slotCode}>{slotInfo.slot_code}</Text>
                <Text style={getStatusBadgeStyle()}>{slotInfo.slot_status}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Floor: {slotInfo.floor_level}</Text>
                <Text style={styles.infoText}>Accommodates: {slotInfo.vehicle_type_name}</Text>
                <Text style={styles.infoText}>Size: {slotInfo.vehicle_type_size}</Text>

                {slotInfo.slot_status === "open" && (
                    <>
                        <View style={styles.rateRow}>
                            <Text style={styles.rateText}>
                                ₱{amount}/{type === "hourly" ? "hr" : type === "daily" ? "day" : "mo"}
                            </Text>
                            <Text style={styles.rateTypeText}>{type} rate</Text>
                        </View>

                        <Pressable style={styles.bookButton} onPress={handleBookSlot}>
                            <Text style={styles.bookButtonText}>Book this slot</Text>
                        </Pressable>
                    </>
                )}

                {slotInfo.is_premium && <Text style={styles.premiumBadge}>Premium</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 4,
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 4,
        marginVertical: 8,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        elevation: 2,
    },
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
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
