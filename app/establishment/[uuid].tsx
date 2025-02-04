import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import React, { useEffect } from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import SlotCard from "@/components/SlotCard";
import calculateDistance from "@/lib/function/calculateDistance";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { OperatingHour } from "@/lib/models/operating-hour";
import type { ParkingEstablishment } from "@/lib/models/parking-establishment";
import type { PaymentMethod } from "@/lib/models/payment-method";
import type { PricingPlan } from "@/lib/models/pricing-plan";
import type { ParkingSlot } from "@/lib/models/parking-slot";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import WebView from "react-native-webview";
import PlatformType from "@/lib/platform";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

interface SlotWithInfo extends ParkingSlot {
    vehicle_type_code: string;
    vehicle_type_name: string;
    vehicle_type_size: string;
}
interface EstablishmentOverviewProps {
    establishment: ParkingEstablishment;
    operating_hours: OperatingHour[];
    payment_methods: PaymentMethod[];
    pricing_plans: PricingPlan[];
    slots: SlotWithInfo[];
}

const EstablishmentOverview: React.FC<EstablishmentOverviewProps> = ({
    establishment,
    operating_hours,
    payment_methods,
    pricing_plans,
    slots,
}) => {
    const { uuid } = useLocalSearchParams<{ uuid: string }>();
    useEffect(() => {
        console.log(uuid);
    });

    const mockEstablishmentData = {
        establishment: {
            uuid: "123e4567-e89b-12d3-a456-426614174000",
            name: "Central Plaza Parking",
            nearby_landmarks: "Near Central Mall, beside City Bank",
            verified: true,
            space_type: "Indoor",
            space_layout: "Multi-level",
            lighting: "Well-lit",
            latitude: 14.5995,
            longitude: 120.9842,
            facilities: "CCTV,Security Guard,Elevator,Restroom",
            is24_7: false,
        },

        operating_hours: [
            { day_of_week: "Monday", opening_time: "06:00", closing_time: "22:00", is_enabled: true },
            { day_of_week: "Tuesday", opening_time: "06:00", closing_time: "22:00", is_enabled: true },
            { day_of_week: "Wednesday", opening_time: "06:00", closing_time: "22:00", is_enabled: true },
            { day_of_week: "Thursday", opening_time: "06:00", closing_time: "22:00", is_enabled: true },
            { day_of_week: "Friday", opening_time: "06:00", closing_time: "23:00", is_enabled: true },
            { day_of_week: "Saturday", opening_time: "07:00", closing_time: "23:00", is_enabled: true },
            { day_of_week: "Sunday", opening_time: "08:00", closing_time: "21:00", is_enabled: true },
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
            {
                uuid: "price-001",
                vehicle_type_code: "CAR",
                base_rate: 50,
                rate_per_hour: 30,
                is_enabled: true,
            },
            {
                uuid: "price-002",
                vehicle_type_code: "MC",
                base_rate: 30,
                rate_per_hour: 20,
                is_enabled: true,
            },
        ],

        slots: [
            {
                uuid: "slot-001",
                slot_number: "A1",
                floor_level: "1",
                is_available: true,
                status: "vacant",
                vehicle_type_code: "CAR",
                vehicle_type_name: "Car",
                vehicle_type_size: "Medium",
            },
            {
                uuid: "slot-002",
                slot_number: "B1",
                floor_level: "1",
                is_available: true,
                status: "vacant",
                vehicle_type_code: "MC",
                vehicle_type_name: "Motorcycle",
                vehicle_type_size: "Small",
            },
        ],
    };
    const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${
        mockEstablishmentData.establishment.latitude
    },${mockEstablishmentData.establishment.longitude}+(${encodeURIComponent(
        mockEstablishmentData.establishment.name
    )})&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

    return (
        <ResponsiveContainer>
            <CardComponent customStyles={styles.card} header={mockEstablishmentData.establishment.name}>
                <View style={styles.header}>
                    <View>
                        <TextComponent style={styles.subtitle}>
                            {mockEstablishmentData.establishment.nearby_landmarks}
                        </TextComponent>
                    </View>
                    {mockEstablishmentData.establishment.verified && (
                        <View style={styles.badge}>
                            <TextComponent style={styles.badgeText}>Verified</TextComponent>
                        </View>
                    )}
                </View>

                <View style={styles.details}>
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons name="car" size={20} color="#6B7280" />
                        <TextComponent style={styles.detailText}>
                            {mockEstablishmentData.establishment.space_type} Layout -{" "}
                            {mockEstablishmentData.establishment.space_layout} Parking
                        </TextComponent>
                    </View>
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons name="lightbulb" size={20} color="#6B7280" />
                        <TextComponent style={styles.detailText}>
                            {mockEstablishmentData.establishment.lighting}
                        </TextComponent>
                    </View>
                </View>
            </CardComponent>

            <CardComponent customStyles={styles.card} header="Payment Methods and Facilities">
                <View style={styles.facilities}>
                    {mockEstablishmentData.payment_methods[0].accepts_cash && (
                        <View style={styles.facilityBadge}>
                            <TextComponent style={styles.facilityText}>Cash</TextComponent>
                        </View>
                    )}
                    {mockEstablishmentData.payment_methods[0].accepts_mobile && (
                        <View style={styles.facilityBadge}>
                            <TextComponent style={styles.facilityText}>Mobile Payment</TextComponent>
                        </View>
                    )}
                    {mockEstablishmentData.payment_methods[0].accepts_other && (
                        <View style={styles.facilityBadge}>
                            <TextComponent style={styles.facilityText}>
                                {mockEstablishmentData.payment_methods[0].other_methods}
                            </TextComponent>
                        </View>
                    )}
                    {mockEstablishmentData.establishment.facilities.split(",").map((facility, index) => (
                        <View key={index} style={styles.facilityBadge}>
                            <TextComponent style={styles.facilityText}>{facility.trim()}</TextComponent>
                        </View>
                    ))}
                </View>
            </CardComponent>

            <CardComponent customStyles={[styles.card, styles.mapCard]} header="Location">
                <View style={styles.mapHeader}>
                    <View style={styles.mapLinks}>
                        <TouchableOpacity
                            onPress={() =>
                                Linking.openURL(
                                    `https://www.google.com/maps/dir/?api=1&destination=${mockEstablishmentData.establishment.latitude},${mockEstablishmentData.establishment.longitude}`
                                )
                            }
                        >
                            <TextComponent style={styles.mapLink}>Google Maps</TextComponent>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                Linking.openURL(
                                    `https://www.waze.com/ul?ll=${mockEstablishmentData.establishment.latitude},${mockEstablishmentData.establishment.longitude}&navigate=yes`
                                )
                            }
                        >
                            <TextComponent style={styles.mapLink}>Waze</TextComponent>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.mapContainer}>
                    {PlatformType() === "web" ? (
                        <iframe
                            frameBorder="0"
                            marginHeight={0}
                            marginWidth={0}
                            title={mockEstablishmentData.establishment.name}
                            src={mapUrl}
                            style={styles.map}
                        />
                    ) : (
                        <WebView source={{ uri: mapUrl }} style={styles.map} />
                    )}
                </View>
            </CardComponent>

            <CardComponent customStyles={styles.card} header="Operating Hours">
                {mockEstablishmentData.establishment.is24_7 ? (
                    <TextComponent style={styles.operatingHours}>Open 24/7</TextComponent>
                ) : (
                    <View style={styles.operatingHoursGrid}>
                        {mockEstablishmentData.operating_hours.map((hour, index) => (
                            <View key={index} style={styles.operatingHour}>
                                <TextComponent style={styles.operatingDay}>{hour.day_of_week}</TextComponent>
                                <TextComponent style={styles.operatingTime}>
                                    {hour.is_enabled ? `${hour.opening_time} - ${hour.closing_time}` : "Closed"}
                                </TextComponent>
                            </View>
                        ))}
                    </View>
                )}
            </CardComponent>

            <View style={styles.slotsSection}>
                <TextComponent variant="h2">Available Parking Slots</TextComponent>
                <View style={styles.slotsGrid}>
                    {/* {mockEstablishmentData.slots.map((slot, index) => (
                            <SlotCard
                                key={index}
                                slotInfo={slot}
                                rates={pricing_plans}
                                establishmentUuid={establishment.uuid}
                                slotUuid={slot.uuid}
                            />
                        ))} */}
                </View>
            </View>
        </ResponsiveContainer>
    );
};

export default EstablishmentOverview;

const styles = StyleSheet.create({
    backLink: {
        color: "#3B82F6",
        marginBottom: 16,
    },
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
        gap: 8,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    detailText: {
        color: "#6B7280",
    },
    facilities: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 16,
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
    mapCard: {
        height: 400,
    },
    mapHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    mapLinks: {
        flexDirection: "row",
        gap: 16,
    },
    mapLink: {
        color: "#3B82F6",
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    operatingHours: {
        color: "#6B7280",
    },
    operatingHoursGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        marginTop: 16,
    },
    operatingHour: {
        backgroundColor: "#F3F4F6",
        padding: 8,
        borderRadius: 8,
    },
    operatingDay: {
        fontWeight: "bold",
        color: "#374151",
    },
    operatingTime: {
        color: "#6B7280",
    },
    slotsSection: {
        marginTop: 16,
    },
    slotsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        marginTop: 16,
    },
});
