import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import WebView from "react-native-webview";
import SlotCard from "@/components/SlotCard"; // Adjust import according to your project
import { OperatingHour } from "@/lib/models/operating-hour";
import { PaymentMethod } from "@/lib/models/payment-method";
import { PricingPlan } from "@/lib/models/pricing-plan";
import type { ParkingSlot } from "@/lib/models/parking-slot";

interface ParkingEstablishment {
    uuid: string;
    name: string;
    nearby_landmarks: string;
    space_type: string;
    space_layout: string;
    lighting: string;
    verified: boolean;
    facilities?: string;
    is24_7: boolean;
    latitude: number;
    longitude: number;
}

interface Slot extends ParkingSlot {
    vehicle_type_code: string;
    vehicle_type_name: string;
    vehicle_type_size: string;
}

interface EstablishmentData {
    establishment: ParkingEstablishment;
    operating_hours: OperatingHour[];
    payment_methods: PaymentMethod[];
    pricing_plans: PricingPlan[];
    slots: Slot[];
}

interface EstablishmentViewProps {
    data: EstablishmentData;
}

const EstablishmentView: React.FC<EstablishmentViewProps> = ({ data }) => {
    // const establishmentData = data.establishment;
    const mockEstablishmentData = {
        establishment: {
            uuid: "e123-456",
            name: "Central Park Garage",
            nearby_landmarks: "Near Central Mall, beside City Bank",
            space_type: "Indoor",
            space_layout: "Multi-level",
            lighting: "Well-lit with LED lighting",
            verified: true,
            facilities: "Security Guard,CCTV,Restroom,Elevator",
            is24_7: false,
            latitude: 14.5995,
            longitude: 120.9842,
        },
        operating_hours: [
            { day_of_week: "Monday", is_enabled: true, opening_time: "06:00", closing_time: "22:00" },
            { day_of_week: "Tuesday", is_enabled: true, opening_time: "06:00", closing_time: "22:00" },
            { day_of_week: "Wednesday", is_enabled: true, opening_time: "06:00", closing_time: "22:00" },
            { day_of_week: "Thursday", is_enabled: true, opening_time: "06:00", closing_time: "22:00" },
            { day_of_week: "Friday", is_enabled: true, opening_time: "06:00", closing_time: "23:00" },
            { day_of_week: "Saturday", is_enabled: true, opening_time: "07:00", closing_time: "23:00" },
            { day_of_week: "Sunday", is_enabled: true, opening_time: "08:00", closing_time: "21:00" },
        ],
        payment_methods: [
            {
                accepts_cash: true,
                accepts_mobile: true,
                accepts_other: true,
                other_methods: "Credit Card",
            },
        ],
        pricing_plans: [
            { vehicle_type: "CAR", rate_per_hour: 50, daily_rate: 400 },
            { vehicle_type: "MOTORCYCLE", rate_per_hour: 20, daily_rate: 160 },
        ],
        slots: [
            {
                uuid: "s1",
                name: "A1",
                vehicle_type_code: "CAR",
                vehicle_type_name: "Car",
                vehicle_type_size: "Standard",
                status: "AVAILABLE",
            },
            {
                uuid: "s2",
                name: "A2",
                vehicle_type_code: "CAR",
                vehicle_type_name: "Car",
                vehicle_type_size: "Standard",
                status: "AVAILABLE",
            },
            {
                uuid: "s3",
                name: "B1",
                vehicle_type_code: "MOTORCYCLE",
                vehicle_type_name: "Motorcycle",
                vehicle_type_size: "Small",
                status: "AVAILABLE",
            },
            {
                uuid: "s4",
                name: "B2",
                vehicle_type_code: "MOTORCYCLE",
                vehicle_type_name: "Motorcycle",
                vehicle_type_size: "Small",
                status: "OCCUPIED",
            },
            {
                uuid: "s5",
                name: "C1",
                vehicle_type_code: "CAR",
                vehicle_type_name: "Car",
                vehicle_type_size: "Standard",
                status: "MAINTENANCE",
            },
        ],
    };

    // Build Google Maps embed URL
    const mapUrl = useMemo(() => {
        return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${
            mockEstablishmentData.establishment.latitude
        },${mockEstablishmentData.establishment.longitude}+(${encodeURIComponent(
            mockEstablishmentData.establishment.name
        )})&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
    }, [mockEstablishmentData.establishment.latitude, mockEstablishmentData.establishment.longitude]);

    const openNavigation = (provider: "google" | "waze") => {
        const { latitude, longitude } = mockEstablishmentData.establishment;

        if (provider === "google") {
            Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`);
        } else {
            Linking.openURL(`https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Back Link */}
            <Text
                style={styles.backLink}
                onPress={() => {
                    /* Implement navigation back */
                }}
            >
                ← Back to Search
            </Text>

            {/* Main Details */}
            <View style={styles.doubleColumn}>
                <View style={[styles.card, styles.flex1]}>
                    <View style={styles.headerRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.establishmentName}>{mockEstablishmentData.establishment.name}</Text>
                            <Text style={styles.landmarksText}>
                                {mockEstablishmentData.establishment.nearby_landmarks}
                            </Text>

                            {/* Space Type / Layout / Lighting */}
                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>
                                    {mockEstablishmentData.establishment.space_type} Layout -{" "}
                                    {mockEstablishmentData.establishment.space_layout} Parking
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>{mockEstablishmentData.establishment.lighting}</Text>
                            </View>
                        </View>

                        {mockEstablishmentData.establishment.verified && (
                            <Text style={styles.verifiedBadge}>Verified</Text>
                        )}
                    </View>
                </View>

                {/* Payment Methods / Facilities */}
                <View style={[styles.card, styles.flex1]}>
                    <Text style={styles.sectionTitle}>Payment Methods and Facilities</Text>
                    <View style={styles.chipContainer}>
                        {mockEstablishmentData.payment_methods[0]?.accepts_cash && (
                            <Text style={styles.paymentChip}>Cash</Text>
                        )}
                        {mockEstablishmentData.payment_methods[0]?.accepts_mobile && (
                            <Text style={styles.paymentChip}>Mobile Payment</Text>
                        )}
                        {mockEstablishmentData.payment_methods[0]?.accepts_other && (
                            <Text style={styles.paymentChip}>
                                {mockEstablishmentData.payment_methods[0]?.other_methods}
                            </Text>
                        )}
                        {mockEstablishmentData.establishment.facilities?.split(",").map((facility, idx) => (
                            <Text style={styles.facilityChip} key={idx}>
                                {facility.trim()}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>

            {/* Map with Navigation Links */}
            <View style={[styles.card, { height: 400 }]}>
                <View style={styles.mapHeader}>
                    <Text style={styles.sectionTitle}>Location</Text>
                    <View style={styles.mapLinks}>
                        <Text style={styles.mapLink} onPress={() => openNavigation("google")}>
                            Google Maps
                        </Text>
                        <Text style={styles.mapLink} onPress={() => openNavigation("waze")}>
                            Waze
                        </Text>
                    </View>
                </View>
                <View style={styles.mapContainer}>
                    <WebView source={{ uri: mapUrl }} style={{ flex: 1 }} />
                </View>
            </View>

            {/* Operating Hours */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Operating Hours</Text>
                {mockEstablishmentData.establishment.is24_7 ? (
                    <Text style={styles.operatingHourText}>Open 24/7</Text>
                ) : (
                    <View style={styles.hoursGrid}>
                        {mockEstablishmentData.operating_hours.map((hour, idx) => (
                            <View style={styles.hourItem} key={idx}>
                                <Text style={styles.hourItemDay}>{hour.day_of_week}</Text>
                                <Text style={styles.hourItemTime}>
                                    {hour.is_enabled ? `${hour.opening_time} - ${hour.closing_time}` : "Closed"}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            {/* Slots */}
            <View style={{ marginVertical: 16 }}>
                <Text style={styles.sectionMainTitle}>Available Parking Slots</Text>
                <View style={styles.slotGrid}>
                    {mockEstablishmentData.slots.map((slot) => (
                        <SlotCard
                            key={slot.uuid}
                            slotInfo={slot}
                            rates={mockEstablishmentData.pricing_plans}
                            establishmentUuid={mockEstablishmentData.establishment.uuid}
                            slotUuid={slot.uuid}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default EstablishmentView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    contentContainer: {
        alignItems: "center",
        padding: 16,
    },
    backLink: {
        alignSelf: "flex-start",
        color: "#3b82f6",
        marginBottom: 12,
        fontSize: 16,
    },
    doubleColumn: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 16,
        gap: 16,
    },
    flex1: {
        flex: 1,
    },
    card: {
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        marginBottom: 16,
        elevation: 2,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    establishmentName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
    },
    landmarksText: {
        marginTop: 8,
        color: "#6b7280",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    infoText: {
        color: "#374151",
    },
    verifiedBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#dcfce7",
        color: "#166534",
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        fontSize: 14,
        fontWeight: "600",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 8,
    },
    chipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    paymentChip: {
        backgroundColor: "#bfdbfe",
        color: "#1e3a8a",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        fontSize: 14,
    },
    facilityChip: {
        backgroundColor: "#f3f4f6",
        color: "#374151",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        fontSize: 14,
    },
    mapHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    mapLinks: {
        flexDirection: "row",
        gap: 16,
    },
    mapLink: {
        color: "#6366f1",
        textDecorationLine: "underline",
    },
    mapContainer: {
        flex: 1,
        borderRadius: 8,
        overflow: "hidden",
    },
    operatingHourText: {
        color: "#6b7280",
    },
    hoursGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 8,
    },
    hourItem: {
        backgroundColor: "#f9fafb",
        padding: 8,
        borderRadius: 6,
    },
    hourItemDay: {
        color: "#374151",
        fontWeight: "600",
    },
    hourItemTime: {
        color: "#6b7280",
    },
    sectionMainTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 8,
    },
    slotGrid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
});
