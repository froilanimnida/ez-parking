import { StyleSheet, View, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import SlotCard from "@/components/SlotCard";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { OperatingHour } from "@lib/models/operatingHour";
import type { ParkingEstablishment } from "@lib/models/parkingEstablishment";
import type { PaymentMethod } from "@lib/models/paymentMethod";
import type { ParkingSlot } from "@lib/models/parkingSlot";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import PlatformType from "@lib/helper/platform";
import { useLocalSearchParams } from "expo-router";
import { fetchEstablishmentInfo } from "@/lib/api/establishment";
import LinkComponent from "@/components/LinkComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { normalMapURL, OSMMapURL, SatteliteMap, threeDimensionalMapURL } from "@/lib/helper/mapViewFunction";
import { getUserLocation } from "@lib/helper/location";
import WebView from "react-native-webview";
import * as WebBrowser from "expo-web-browser";

interface Slot extends ParkingSlot {
    vehicle_type_code: string;
    vehicle_type_name: string;
    vehicle_type_size: string;
}

interface EstablishmentOverviewResponse {
    establishment: ParkingEstablishment;
    operating_hours: OperatingHour[];
    payment_methods: PaymentMethod[];
    slots: Slot[];
}

const EstablishmentOverview = () => {
    const { uuid } = useLocalSearchParams<{ uuid: string }>();
    const [establishment, setEstablishment] = useState<EstablishmentOverviewResponse | null>(null);
    const [userLocation, setUserLocation] = useState({
        latitude: 14.5995,
        longitude: 120.9842,
    });
    const [fetching, setIsFetching] = useState(true);

    const openBrowser = async () => {
        await WebBrowser.openBrowserAsync(
            `https://ez-parking.expo.app/directions?latitude=${establishment?.establishment.latitude}&longitude=${establishment?.establishment.longitude}`,
        );
    };

    useEffect(() => {
        let mounted = true;
        let pollInterval: NodeJS.Timeout;

        const fetchEstablishment = async () => {
            const getEstablishmentInfo = async () => {
                try {
                    const result = await fetchEstablishmentInfo(uuid);
                    const currentLocation = await getUserLocation();
                    setUserLocation(currentLocation.coords);
                    setEstablishment(result.data.establishment);
                } catch (error) {
                    console.error("Error fetching establishment info:", error);
                    return null;
                } finally {
                    setIsFetching(false);
                }
            };
            getEstablishmentInfo().then();
        };

        const startPolling = () => {
            fetchEstablishment().then();
            pollInterval = setInterval(fetchEstablishment, 10000);
        };

        if (uuid) {
            startPolling();
        }
        return () => {
            mounted = false;
            if (pollInterval) {
                clearInterval(pollInterval);
            }
        };
    }, [uuid]);
    const mapUrl =
        (establishment &&
            normalMapURL(
                establishment.establishment.latitude,
                establishment.establishment.longitude,
                establishment.establishment.name,
            )) ||
        "";

    const mapUrl3D =
        (establishment &&
            threeDimensionalMapURL(
                establishment.establishment.latitude,
                establishment.establishment.longitude,
                establishment.establishment.name,
            )) ||
        "";

    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent
                    variant="outline"
                    style={{ marginBottom: 16 }}
                    href=".././establishment"
                    label="← Back to Search"
                />
            </View>
            {fetching && <LoadingComponent text="Fetching the establishment details" />}
            {establishment != null && !fetching && (
                <>
                    <CardComponent customStyles={styles.card} header={establishment.establishment.name}>
                        <View style={styles.header}>
                            <View>
                                <TextComponent style={styles.subtitle}>
                                    {establishment.establishment.nearby_landmarks}
                                </TextComponent>
                            </View>
                        </View>

                        <View style={styles.details}>
                            <View style={styles.detailRow}>
                                <MaterialCommunityIcons name="car" size={20} color="#6B7280" />
                                <TextComponent style={styles.detailText}>
                                    {establishment.establishment.space_type} Layout -{" "}
                                    {establishment.establishment.space_layout} Parking
                                </TextComponent>
                            </View>
                            <View style={styles.detailRow}>
                                <MaterialCommunityIcons name="lightbulb" size={20} color="#6B7280" />
                                <TextComponent style={styles.detailText}>
                                    {establishment.establishment.lighting}
                                </TextComponent>
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

                    <CardComponent customStyles={styles.card} header="Location">
                        <View style={styles.mapHeader}>
                            <View style={styles.mapLinks}>
                                <ButtonComponent
                                    onPress={() =>
                                        Linking.openURL(
                                            `https://www.google.com/maps/dir/?api=1&destination=${establishment.establishment.latitude},${establishment.establishment.longitude}`,
                                        )
                                    }
                                    title="Google Maps"
                                />
                                <ButtonComponent
                                    title="Waze"
                                    onPress={() =>
                                        Linking.openURL(
                                            `https://www.waze.com/ul?ll=${establishment.establishment.latitude},${establishment.establishment.longitude}&navigate=yes`,
                                        )
                                    }
                                />
                                <ButtonComponent title="Get Directions" onPress={openBrowser} />
                            </View>
                        </View>
                    </CardComponent>
                    <CardComponent header="Location Details">
                        {PlatformType() !== "web" ? (
                            <WebView
                                source={{
                                    uri: OSMMapURL(
                                        establishment.establishment.latitude,
                                        establishment.establishment.longitude,
                                    ),
                                }}
                                style={{ height: 500 }}
                            />
                        ) : (
                            <iframe title={establishment.establishment.name} src={mapUrl} height={500} />
                        )}
                    </CardComponent>

                    <CardComponent header="Location Details Birds Eye View">
                        {PlatformType() !== "web" ? (
                            <WebView
                                source={{
                                    uri: SatteliteMap(
                                        establishment.establishment.latitude,
                                        establishment.establishment.longitude,
                                    ),
                                }}
                                style={{ height: 500, flex: 1 }}
                            />
                        ) : (
                            <iframe title={establishment.establishment.name} src={mapUrl3D} height={500} />
                        )}
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
                                    isGuest={true}
                                    slotUuid={slot.uuid}
                                    establishmentUuid={uuid}
                                />
                            ))}
                        </View>
                    </View>
                </>
            )}
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
        maxWidth: "100%",
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
        maxWidth: "100%",
        overflow: "scroll",
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
