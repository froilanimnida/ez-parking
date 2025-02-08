import React, { useMemo } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import WebView from "react-native-webview";
import { OperatingHour } from "@/lib/models/operating-hour";
import { PaymentMethod } from "@/lib/models/payment-method";
import { PricingPlan } from "@/lib/models/pricing-plan";
import type { ParkingSlot } from "@/lib/models/parking-slot";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import LinkComponent from "@/components/LinkComponent";
import CardComponent from "@/components/CardComponent";
import TextComponent from "@/components/TextComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";

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

const EstablishmentView = () => {
    const { uuid, slot } = useLocalSearchParams();
    console.log(uuid, slot);
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
        <ResponsiveContainer>
            <LinkComponent style={{ width: "auto", marginBottom: 16 }} href="../../user">
                ← Back to Dashboard
            </LinkComponent>

            <CardComponent
                customStyles={styles.card}
                header="Establishment Information"
                subHeader="Details about the parking establishment"
            >
                <View style={styles.headerRow}>
                    <View style={{ flex: 1 }}>
                        <TextComponent style={styles.establishmentName}>
                            {mockEstablishmentData.establishment.name}
                        </TextComponent>
                        <TextComponent style={styles.landmarksText}>
                            {mockEstablishmentData.establishment.nearby_landmarks}
                        </TextComponent>
                        <View style={styles.infoRow}>
                            <TextComponent style={styles.infoText}>
                                {mockEstablishmentData.establishment.space_type} Layout -{" "}
                                {mockEstablishmentData.establishment.space_layout} Parking
                            </TextComponent>
                        </View>
                        <View style={styles.infoRow}>
                            <TextComponent style={styles.infoText}>
                                {mockEstablishmentData.establishment.lighting}
                            </TextComponent>
                        </View>
                    </View>

                    {mockEstablishmentData.establishment.verified && <Text style={styles.verifiedBadge}>Verified</Text>}
                </View>
            </CardComponent>

            <CardComponent
                customStyles={styles.card}
                header="Payment Methods and Facilities"
                subHeader="Accepted payment methods and facilities"
            >
                <View style={styles.chipContainer}>
                    {mockEstablishmentData.payment_methods[0]?.accepts_cash && (
                        <TextComponent style={styles.paymentChip}>Cash</TextComponent>
                    )}
                    {mockEstablishmentData.payment_methods[0]?.accepts_mobile && (
                        <TextComponent style={styles.paymentChip}>Mobile Payment</TextComponent>
                    )}
                    {mockEstablishmentData.payment_methods[0]?.accepts_other && (
                        <TextComponent style={styles.paymentChip}>
                            {mockEstablishmentData.payment_methods[0]?.other_methods}
                        </TextComponent>
                    )}
                    {mockEstablishmentData.establishment.facilities?.split(",").map((facility, idx) => (
                        <TextComponent style={styles.facilityChip} key={idx}>
                            {facility.trim()}
                        </TextComponent>
                    ))}
                </View>
            </CardComponent>

            {/* Map with Navigation Links */}
            <View style={[styles.card, { height: 400 }]}>
                <View style={styles.mapHeader}>
                    <TextComponent style={styles.sectionTitle}>Location</TextComponent>
                    <View style={styles.mapLinks}>
                        <ButtonComponent onPress={() => openNavigation("google")}>Google Maps</ButtonComponent>
                        <ButtonComponent onPress={() => openNavigation("waze")}>Waze</ButtonComponent>
                    </View>
                </View>
                <View style={styles.mapContainer}>
                    <WebView source={{ uri: mapUrl }} style={{ flex: 1 }} />
                </View>
            </View>

            {/* Operating Hours */}
            <View style={styles.card}>
                <TextComponent style={styles.sectionTitle}>Operating Hours</TextComponent>
                {mockEstablishmentData.establishment.is24_7 ? (
                    <TextComponent style={styles.operatingHourText}>Open 24/7</TextComponent>
                ) : (
                    <View style={styles.hoursGrid}>
                        {mockEstablishmentData.operating_hours.map((hour, idx) => (
                            <View style={styles.hourItem} key={idx}>
                                <TextComponent style={styles.hourItemDay}>{hour.day_of_week}</TextComponent>
                                <TextComponent style={styles.hourItemTime}>
                                    {hour.is_enabled ? `${hour.opening_time} - ${hour.closing_time}` : "Closed"}
                                </TextComponent>
                            </View>
                        ))}
                    </View>
                )}
            </View>
            <View style={{ marginVertical: 16 }}>
                <TextComponent style={styles.sectionMainTitle}>Available Parking Slots</TextComponent>
                <View style={styles.slotGrid}>
                    {/* {mockEstablishmentData.slots.map((slot) => (
                        // <SlotCard
                        //     key={slot.uuid}
                        //     slotInfo={slot}
                        //     rates={mockEstablishmentData.pricing_plans}
                        //     establishmentUuid={mockEstablishmentData.establishment.uuid}
                        //     slotUuid={slot.uuid}
                        // />
                    ))} */}
                </View>
            </View>
        </ResponsiveContainer>
    );
};

export default EstablishmentView;

const styles = StyleSheet.create({
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
        marginBottom: 16,
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
