import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, Modal, Alert, ActivityIndicator } from "react-native";
import WebView from "react-native-webview";
import CardComponent from "@/components/CardComponent";
import PlatformType from "@/lib/platform";
import TextComponent from "@/components/TextComponent";
import LinkComponent from "@/components/LinkComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { viewTransaction } from "@/lib/api/transaction";
import { router, useLocalSearchParams } from "expo-router";
import type { TransactionDetailsType } from "@/lib/models/userRoleTypes";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    return Math.random() * 10;
}

const TransactionDetails = () => {
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetailsType>({});
    const [isFetching, setIsFetching] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [userLatitude, setUserLatitude] = useState(0);
    const [userLongitude, setUserLongitude] = useState(0);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const { uuid } = useLocalSearchParams<{ uuid: string }>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLatitude(position.coords.latitude);
                setUserLongitude(position.coords.longitude);
                setLoadingLocation(false);
            },
            () => {
                Alert.alert("Error getting user location");
                setLoadingLocation(false);
            },
            { enableHighAccuracy: true }
        );
        const getTransactionDetails = async () => {
            viewTransaction(uuid).then((response) => {
                console.log(response);
                setIsFetching(false);
                setTransactionDetails(response.data.transaction);
                if (!transactionDetails) {
                    router.replace("../transactions");
                }
            });
        };
        getTransactionDetails();
    }, []);

    const handleCancelTransaction = () => {
        setIsCancelModalOpen(false);
        Alert.alert("Transaction cancelled.");
    };

    const establishmentLatitude = transactionDetails?.establishment_info?.latitude;
    const establishmentLongitude = transactionDetails?.establishment_info?.longitude;

    const mapUrl =
        establishmentLatitude && establishmentLongitude
            ? `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${establishmentLatitude},${establishmentLongitude}+(${encodeURIComponent(
                  transactionDetails.establishment_info.name
              )})&t=&z=14&ie=UTF8&iwloc=B&output=embed`
            : "";
    const distanceKm =
        transactionDetails.slot_info?.slot_status === "reserved"
            ? calculateDistance(establishmentLatitude, establishmentLongitude, userLatitude, userLongitude).toFixed(1)
            : null;
    return (
        <ResponsiveContainer>
            <LinkComponent style={{ marginBottom: 16 }} href="../transactions">
                ← Back to Transaction
            </LinkComponent>
            {isFetching && <LoadingComponent text="Fetching transaction details..." />}

            {!isFetching && transactionDetails && (
                <View style={{ gap: 16 }}>
                    <CardComponent
                        header="Transaction Details"
                        subHeader={`Transaction #${transactionDetails.transaction_data?.transaction_id}`}
                    >
                        <View style={styles.badgesRow}>
                            {transactionDetails.transaction_data?.status !== "cancelled" && (
                                <View
                                    style={[
                                        styles.badge,
                                        transactionDetails.transaction_data?.payment_status === "PAID"
                                            ? styles.badgeSuccess
                                            : transactionDetails.transaction_data.payment_status === "PARTIALLY_PAID"
                                            ? styles.badgeWarning
                                            : transactionDetails.transaction_data.payment_status === "OVERDUE"
                                            ? styles.badgeError
                                            : styles.badgeGray,
                                    ]}
                                >
                                    <TextComponent style={styles.badgeText}>
                                        {transactionDetails.transaction_data.payment_status}
                                    </TextComponent>
                                </View>
                            )}
                            <View
                                style={[
                                    styles.badge,
                                    transactionDetails.transaction_data.status === "active"
                                        ? styles.badgeInfo
                                        : transactionDetails.transaction_data.status === "completed"
                                        ? styles.badgeSuccess
                                        : transactionDetails.transaction_data.status === "cancelled"
                                        ? styles.badgeError
                                        : styles.badgeWarning,
                                ]}
                            >
                                <TextComponent style={styles.badgeText}>
                                    {transactionDetails.transaction_data.status}
                                </TextComponent>
                            </View>
                        </View>
                    </CardComponent>

                    <CardComponent header="Vehicle Details">
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Plate Number</TextComponent>
                            <TextComponent style={styles.lineValue}>
                                {transactionDetails.user_plate_number}
                            </TextComponent>
                        </View>
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Vehicle Type</TextComponent>
                            <TextComponent style={styles.lineValue}>
                                {transactionDetails.slot_info.vehicle_type_name}
                            </TextComponent>
                        </View>
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Size Category</TextComponent>
                            <TextComponent style={styles.lineValue}>
                                {transactionDetails.slot_info.vehicle_type_size}
                            </TextComponent>
                        </View>
                    </CardComponent>

                    <CardComponent header="Establishment Details">
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Name</TextComponent>
                            <TextComponent style={styles.lineValue}>
                                {transactionDetails.establishment_info.name}
                            </TextComponent>
                        </View>
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Address</TextComponent>
                            <TextComponent style={styles.lineValue}>
                                {transactionDetails.address_info.street}
                                {transactionDetails.address_info.city}
                                {transactionDetails.address_info.province}
                                {transactionDetails.address_info.postal_code}
                            </TextComponent>
                        </View>
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Contact Number</TextComponent>
                            <TextComponent style={styles.lineValue}>{transactionDetails.contact_number}</TextComponent>
                        </View>

                        {transactionDetails.transaction_data.status === "reserved" && (
                            <View style={styles.lineRow}>
                                <TextComponent style={styles.lineLabel}>Distance</TextComponent>
                                {loadingLocation ? (
                                    <ActivityIndicator />
                                ) : (
                                    <TextComponent style={styles.lineValue}>
                                        Approximately {distanceKm} km away
                                    </TextComponent>
                                )}
                            </View>
                        )}

                        {/* Direction Links */}
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Get Directions</TextComponent>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                <LinkComponent
                                    style={{ marginRight: 16 }}
                                    href={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${
                                        transactionDetails.establishment_info.latitude
                                    },${transactionDetails.establishment_info.longitude}+(${encodeURIComponent(
                                        transactionDetails.establishment_info.name
                                    )})&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                                >
                                    Google Maps
                                </LinkComponent>
                                <LinkComponent
                                    style={{ marginRight: 16 }}
                                    href={`https://www.waze.com/ul?ll=${transactionDetails.establishment_info.latitude},${transactionDetails.establishment_info.longitude}&navigate=yes`}
                                >
                                    Waze
                                </LinkComponent>
                                <LinkComponent href="./">Our Map</LinkComponent>
                            </View>
                        </View>
                    </CardComponent>

                    <CardComponent header="Timing Details">
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Entry Time</TextComponent>
                            <TextComponent style={styles.lineValue}>
                                {transactionDetails.transaction_data.entry_time !== "Not Available"
                                    ? new Date(transactionDetails.transaction_data.entry_time).toLocaleString()
                                    : "Not Available"}
                            </TextComponent>
                        </View>

                        {transactionDetails.transaction_data.exit_time && (
                            <View style={styles.lineRow}>
                                <TextComponent style={styles.lineLabel}>Exit Time</TextComponent>
                                <TextComponent style={styles.lineValue}>
                                    {transactionDetails.transaction_data.exit_time !== "Not Available"
                                        ? new Date(transactionDetails.transaction_data.exit_time).toLocaleString()
                                        : "Not Available"}
                                </TextComponent>
                            </View>
                        )}
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Amount Due</TextComponent>
                            <TextComponent style={styles.lineValue}>
                                ₱{transactionDetails.transaction_data.amount_due ?? "0.00"}
                            </TextComponent>
                        </View>
                    </CardComponent>

                    {/* Slot Details */}
                    <CardComponent header="Slot Details">
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Slot Code</TextComponent>
                            <TextComponent style={styles.lineValue}>
                                {transactionDetails.slot_info.slot_code}
                            </TextComponent>
                        </View>
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Floor Level</TextComponent>
                            <TextComponent style={styles.lineValue}>
                                Level {transactionDetails.slot_info.floor_level}
                            </TextComponent>
                        </View>
                        <View style={styles.lineRow}>
                            <TextComponent style={styles.lineLabel}>Features</TextComponent>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TextComponent style={styles.lineValue}>
                                    {transactionDetails.slot_info.slot_features}
                                </TextComponent>
                                {transactionDetails.slot_info.is_premium && (
                                    <View style={styles.premiumBadge}>
                                        <TextComponent style={styles.premiumBadgeText}>Premium</TextComponent>
                                    </View>
                                )}
                            </View>
                        </View>
                    </CardComponent>

                    {/* QR Code if active or reserved */}
                    {transactionDetails.qr_code &&
                        ["active", "reserved"].includes(transactionDetails.transaction_data.status) && (
                            <CardComponent header="QR Code">
                                <View style={{ alignItems: "center", marginTop: 16 }}>
                                    <Image
                                        source={{ uri: `data:image/png;base64,${transactionDetails.qr_code}` }}
                                        style={{ width: 100, height: 100, marginBottom: 16 }}
                                    />
                                    <Image
                                        source={require("@/assets/images/mock_qr.png")}
                                        style={{ width: "25%", marginBottom: 16, aspectRatio: 1, height: "auto" }}
                                    />
                                    <Pressable style={styles.qrButton} onPress={() => setIsModalOpen(true)}>
                                        <TextComponent style={styles.qrButtonText}>View Larger</TextComponent>
                                    </Pressable>
                                    <TextComponent style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                                        Show this QR code to the parking attendant
                                    </TextComponent>
                                </View>
                            </CardComponent>
                        )}

                    {/* Map Location */}
                    <CardComponent header="Location Details">
                        <View style={styles.mapContainer}>
                            {PlatformType() === "web" ? (
                                <iframe src={mapUrl} style={{ width: "100%", height: "100%" }}></iframe>
                            ) : (
                                <WebView source={{ uri: mapUrl }} style={{ flex: 1 }} />
                            )}
                        </View>
                    </CardComponent>

                    <View style={styles.footer}>
                        <ButtonComponent
                            title={
                                transactionDetails.transaction_data.status === "cancelled"
                                    ? "Transaction Cancelled"
                                    : "Cancel Transaction"
                            }
                            style={[
                                transactionDetails.transaction_data.status === "cancelled" &&
                                    styles.cancelButtonDisabled,
                            ]}
                            onPress={
                                transactionDetails.transaction_data.status === "cancelled"
                                    ? () => {}
                                    : () => setIsCancelModalOpen(true)
                            }
                        />
                    </View>

                    <Modal
                        visible={isCancelModalOpen}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setIsCancelModalOpen(false)}
                    >
                        <Pressable style={styles.modalOverlay} onPress={() => setIsCancelModalOpen(false)}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalIcon}>
                                    <Text style={styles.modalIconText}>!</Text>
                                </View>
                                <Text style={styles.modalTitle}>Cancel Transaction</Text>
                                <Text style={styles.modalMessage}>
                                    Are you sure you want to cancel this transaction? This action cannot be undone.
                                </Text>
                                <View style={styles.modalActions}>
                                    <Pressable
                                        style={styles.modalCancelBtn}
                                        onPress={() => setIsCancelModalOpen(false)}
                                    >
                                        <Text style={styles.modalCancelText}>No, keep it</Text>
                                    </Pressable>
                                    <Pressable style={styles.modalConfirmBtn} onPress={handleCancelTransaction}>
                                        <Text style={styles.modalConfirmText}>Yes, cancel transaction</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                    </Modal>

                    <Modal
                        visible={isModalOpen}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setIsModalOpen(false)}
                    >
                        <Pressable style={styles.qrModalOverlay} onPress={() => setIsModalOpen(false)}>
                            <View style={styles.qrModalContent}>
                                <Pressable onPress={() => setIsModalOpen(false)} style={styles.qrModalClose}>
                                    <Text style={{ color: "#fff" }}>Close</Text>
                                </Pressable>
                                <Image
                                    source={require("@/assets/images/mock_qr.png")}
                                    style={styles.qrModalImage}
                                    resizeMode="contain"
                                />
                                <Image
                                    source={require("@/assets/images/mock_qr.png")}
                                    style={styles.qrModalImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </Pressable>
                    </Modal>
                </View>
            )}
        </ResponsiveContainer>
    );
};

export default TransactionDetails;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
    },
    subTitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 2,
    },
    badgesRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    badge: {
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginLeft: 4,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "600",
    },
    badgeSuccess: {
        backgroundColor: "#dcfce7",
    },
    badgeWarning: {
        backgroundColor: "#fef9c3",
    },
    badgeError: {
        backgroundColor: "#fee2e2",
    },
    badgeInfo: {
        backgroundColor: "#dbeafe",
    },
    badgeGray: {
        backgroundColor: "#e5e7eb",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 8,
    },
    lineRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
    lineLabel: {
        fontSize: 14,
        color: "#6b7280",
    },
    lineValue: {
        fontSize: 14,
        color: "#111827",
        fontWeight: "500",
    },
    premiumBadge: {
        backgroundColor: "#f3e8ff",
        marginLeft: 6,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    premiumBadgeText: {
        fontSize: 10,
        color: "#6b21a8",
        fontWeight: "600",
    },
    mapContainer: {
        marginTop: 16,
        height: 300,
        borderRadius: 8,
        overflow: "hidden",
    },
    footer: {
        marginHorizontal: 16,
        marginBottom: 24,
        alignItems: "flex-end",
    },
    cancelButton: {
        backgroundColor: "#dc2626",
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    cancelButtonDisabled: {
        backgroundColor: "#fecaca",
    },
    cancelButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    // Cancel Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
    },
    modalIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fee2e2",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    modalIconText: {
        color: "#dc2626",
        fontWeight: "700",
        fontSize: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        color: "#111827",
    },
    modalMessage: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 16,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    modalCancelBtn: {
        backgroundColor: "#f9fafb",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    modalCancelText: {
        color: "#374151",
    },
    modalConfirmBtn: {
        backgroundColor: "#dc2626",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
    },
    modalConfirmText: {
        color: "#fff",
    },
    // QR code button
    qrButton: {
        backgroundColor: "#4f46e5",
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    qrButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    // QR Modal
    qrModalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    qrModalContent: {
        position: "relative",
        maxWidth: "90%",
        maxHeight: "90%",
    },
    qrModalClose: {
        position: "absolute",
        top: -40,
        right: 0,
        padding: 8,
    },
    qrModalImage: {
        width: "100%",
        height: "auto",
        borderRadius: 8,
    },
});
