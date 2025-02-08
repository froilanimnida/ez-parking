import { StyleSheet, View, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import SlotCard from "@/components/guest/SlotCard";
import calculateDistance from "@/lib/function/calculateDistance";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { OperatingHour } from "@/lib/models/operating-hour";
import type { ParkingEstablishment } from "@/lib/models/parking-establishment";
import type { PaymentMethod } from "@/lib/models/payment-method";
import type { PricingPlan } from "@/lib/models/pricing-plan";
import type { ParkingSlot } from "@/lib/models/parking-slot";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import WebView from "react-native-webview";
import PlatformType from "@/lib/platform";
import { useLocalSearchParams } from "expo-router";
import { fetchEstablishmentInfo } from "@/lib/api/establishment";
import LinkComponent from "@/components/LinkComponent";
import ButtonComponent from "@/components/ButtonComponent";

interface Slot extends ParkingSlot {
    vehicle_type_code: string;
    vehicle_type_name: string;
    vehicle_type_size: string;
}

interface EstablishmentOverviewResponse {
    establishment: ParkingEstablishment;
    operating_hours: OperatingHour[];
    payment_methods: PaymentMethod[];
    pricing_plans: PricingPlan[];
    slots: Slot[];
}

const getEstablishmentInfo = async (establishmentUuid: string) => await fetchEstablishmentInfo(establishmentUuid);
const EstablishmentOverview = () => {
    const { uuid } = useLocalSearchParams<{ uuid: string }>();
    const [establishment, setEstablishment] = useState<EstablishmentOverviewResponse | null>(null);
    const [fetching, setIsFetching] = useState(true);

    useEffect(() => {
        (async () => {
            const fetchEstablishment = async () => {
                try {
                    const result = await getEstablishmentInfo(uuid);
                    setEstablishment(result.data.establishment);
                } catch (error) {
                    console.error("Error fetching establishment info:", error);
                } finally {
                    setIsFetching(false);
                }
            };

            if (uuid) {
                fetchEstablishment();
            }
        })();
    }, [uuid]);

    if (fetching || !establishment) {
        return (
            <ResponsiveContainer>
                <LoadingComponent text="Fetching the establishment details" />
            </ResponsiveContainer>
        );
    }

    const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${
        establishment.establishment.latitude
    },${establishment.establishment.longitude}+(${encodeURIComponent(
        establishment.establishment.name
    )})&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

    return (
        <ResponsiveContainer>
            <CardComponent customStyles={styles.card} header={establishment.establishment.name}>
                <View style={styles.header}>
                    <View>
                        <TextComponent style={styles.subtitle}>
                            {establishment.establishment.nearby_landmarks}
                        </TextComponent>
                    </View>
                    {establishment.establishment.verified && (
                        <View style={styles.badge}>
                            <TextComponent style={styles.badgeText}>Verified</TextComponent>
                        </View>
                    )}
                </View>

                <View style={styles.details}>
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons name="car" size={20} color="#6B7280" />
                        <TextComponent style={styles.detailText}>
                            {establishment.establishment.space_type} Layout - {establishment.establishment.space_layout}{" "}
                            Parking
                        </TextComponent>
                    </View>
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons name="lightbulb" size={20} color="#6B7280" />
                        <TextComponent style={styles.detailText}>{establishment.establishment.lighting}</TextComponent>
                    </View>
                </View>
            </CardComponent>
            <CardComponent customStyles={styles.card} header="Payment Methods and Facilities">
                <View style={styles.facilities}>
                    {establishment.payment_methods?.length > 0 && (
                        <>
                            {establishment.payment_methods[0]?.accepts_cash && (
                                <View style={styles.facilityBadge}>
                                    <TextComponent style={styles.facilityText}>Cash</TextComponent>
                                </View>
                            )}
                            {establishment.payment_methods[0]?.accepts_mobile && (
                                <View style={styles.facilityBadge}>
                                    <TextComponent style={styles.facilityText}>Mobile Payment</TextComponent>
                                </View>
                            )}
                            {establishment.payment_methods[0]?.accepts_other && (
                                <View style={styles.facilityBadge}>
                                    <TextComponent style={styles.facilityText}>
                                        {establishment.payment_methods[0]?.other_methods}
                                    </TextComponent>
                                </View>
                            )}
                        </>
                    )}
                </View>
            </CardComponent>

            <CardComponent customStyles={[styles.card, styles.mapCard]} header="Location">
                <View style={styles.mapHeader}>
                    <View style={styles.mapLinks}>
                        <ButtonComponent
                            onPress={() =>
                                Linking.openURL(
                                    `https://www.google.com/maps/dir/?api=1&destination=${establishment.establishment.latitude},${establishment.establishment.longitude}`
                                )
                            }
                            title="Google Maps"
                        />
                        <ButtonComponent
                            title="Waze"
                            onPress={() =>
                                Linking.openURL(
                                    `https://www.waze.com/ul?ll=${establishment.establishment.latitude},${establishment.establishment.longitude}&navigate=yes`
                                )
                            }
                        />
                    </View>
                </View>
                <View style={styles.mapContainer}>
                    {PlatformType() !== "web" ? (
                        <WebView source={{ uri: mapUrl }} style={styles.map} />
                    ) : (
                        <iframe
                            frameBorder="0"
                            marginHeight={0}
                            marginWidth={0}
                            title={establishment.establishment.name}
                            src={mapUrl}
                            style={styles.map}
                        />
                    )}
                </View>
            </CardComponent>

            <CardComponent customStyles={styles.card} header="Operating Hours">
                {establishment.establishment.is24_7 ? (
                    <TextComponent style={styles.operatingHours}>Open 24/7</TextComponent>
                ) : (
                    <View style={styles.operatingHoursGrid}>
                        {establishment.operating_hours.map((hour, index) => (
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
                    {establishment.slots.map((slot, index) => (
                        <SlotCard
                            key={index}
                            slotInfo={slot}
                            rates={establishment.pricing_plans}
                            establishmentUuid={uuid}
                            slotUuid={slot.uuid}
                        />
                    ))}
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
