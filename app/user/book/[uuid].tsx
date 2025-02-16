import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import WebView from "react-native-webview";
import { OperatingHour } from "@lib/models/operatingHour";
import { PaymentMethod } from "@/lib/models/payment-method";
import type { ParkingSlot } from "@/lib/models/parking-slot";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import LinkComponent from "@/components/LinkComponent";
import CardComponent from "@/components/CardComponent";
import TextComponent from "@/components/TextComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { useLocalSearchParams } from "expo-router";
import PlatformType from "@lib/helper/platform";
import { fetchEstablishmentData } from "@/lib/api/fetchSlots";
import SlotCard from "@/components/SlotCard";
import LoadingComponent from "@/components/reusable/LoadingComponent";

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
    slots: Slot[];
}

const EstablishmentView = () => {
    const { uuid } = useLocalSearchParams() as { uuid: string };
    const [establishmentData, setEstablishmentData] = useState<EstablishmentData | null>(null);
    const [loading, setLoading] = useState(true);

    const pollSlotStatus = async () => {
        try {
            const response = await fetchEstablishmentData(uuid);
            setEstablishmentData(response.data.establishment);
        } catch (error) {
            console.error("Error fetching establishment data:", error);
        }
    };

    useEffect(() => {
        const fetchEstablishment = async () => {
            try {
                const response = await fetchEstablishmentData(uuid);
                setEstablishmentData(response.data.establishment);
            } catch (error) {
                console.error("Error fetching establishment data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEstablishment().then();
    }, [uuid]);

    const mapUrl = useMemo(() => {
        if (!establishmentData?.establishment) return "";

        return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${
            establishmentData.establishment.latitude
        },${establishmentData.establishment.longitude}+(${encodeURIComponent(
            establishmentData.establishment.name,
        )})&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
    }, [establishmentData?.establishment]);

    const openNavigation = (provider: "google" | "waze") => {
        const { latitude, longitude } = establishmentData!.establishment;

        if (provider === "google") {
            Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`);
        } else {
            Linking.openURL(`https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`);
        }
    };

    return (
        <ResponsiveContainer>
            <LinkComponent label="← Back to Dashboard" style={{ width: "auto", marginBottom: 16 }} href="../../user" />
            {!loading && establishmentData && (
                <>
                    <CardComponent
                        customStyles={styles.card}
                        header="Establishment Information"
                        subHeader="Details about the parking establishment"
                    >
                        <View style={styles.headerRow}>
                            <View style={{ flex: 1 }}>
                                <TextComponent style={styles.establishmentName}>
                                    {establishmentData.establishment.name}
                                </TextComponent>
                                <TextComponent style={styles.landmarksText}>
                                    {establishmentData.establishment.nearby_landmarks}
                                </TextComponent>
                                <View style={styles.infoRow}>
                                    <TextComponent style={styles.infoText}>
                                        {establishmentData.establishment.space_type} Layout -{" "}
                                        {establishmentData.establishment.space_layout} Parking
                                    </TextComponent>
                                </View>
                                <View style={styles.infoRow}>
                                    <TextComponent style={styles.infoText}>
                                        {establishmentData.establishment.lighting}
                                    </TextComponent>
                                </View>
                            </View>

                            {establishmentData.establishment.verified && (
                                <Text style={styles.verifiedBadge}>Verified</Text>
                            )}
                        </View>
                    </CardComponent>

                    <CardComponent
                        customStyles={styles.card}
                        header="Payment Methods and Facilities"
                        subHeader="Accepted payment methods and facilities"
                    >
                        <View style={styles.chipContainer}>
                            {establishmentData.payment_methods[0]?.accepts_cash && (
                                <TextComponent style={styles.paymentChip}>Cash</TextComponent>
                            )}
                            {establishmentData.payment_methods[0]?.accepts_mobile && (
                                <TextComponent style={styles.paymentChip}>Mobile Payment</TextComponent>
                            )}
                            {establishmentData.payment_methods[0]?.accepts_other && (
                                <TextComponent style={styles.paymentChip}>
                                    {establishmentData.payment_methods[0]?.other_methods}
                                </TextComponent>
                            )}
                            {establishmentData.establishment.facilities?.split(",").map((facility, idx) => (
                                <TextComponent style={styles.facilityChip} key={idx}>
                                    {facility.trim()}
                                </TextComponent>
                            ))}
                        </View>
                    </CardComponent>

                    <View style={[styles.card, { height: 400 }]}>
                        <View style={styles.mapHeader}>
                            <TextComponent style={styles.sectionTitle}>Location</TextComponent>
                            <View style={styles.mapLinks}>
                                <ButtonComponent title="Google Maps" onPress={() => openNavigation("google")} />
                                <ButtonComponent title="Waze" onPress={() => openNavigation("waze")} />
                            </View>
                        </View>
                        <CardComponent
                            header="Map"
                            subHeader="View the location of the parking establishment"
                            customStyles={styles.mapContainer}
                        >
                            {PlatformType() === "web" ? (
                                <iframe width="100%" height="100%" src={mapUrl} />
                            ) : (
                                <WebView source={{ uri: mapUrl }} style={{ flex: 1 }} />
                            )}
                        </CardComponent>
                    </View>

                    {/* Operating Hours */}
                    <View style={styles.card}>
                        <TextComponent style={styles.sectionTitle}>Operating Hours</TextComponent>
                        {establishmentData.establishment.is24_7 ? (
                            <TextComponent style={styles.operatingHourText}>Open 24/7</TextComponent>
                        ) : (
                            <View style={styles.hoursGrid}>
                                {establishmentData.operating_hours.map((hour, idx) => (
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
                            {establishmentData.slots.map((slot) => (
                                <SlotCard
                                    establishmentUuid={uuid}
                                    key={slot.uuid}
                                    isGuest={false}
                                    slotInfo={slot}
                                    slotUuid={slot.uuid}
                                />
                            ))}
                        </View>
                    </View>
                </>
            )}
            {loading && <LoadingComponent text="Loading establishment data..." />}
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
        height: 300,
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
