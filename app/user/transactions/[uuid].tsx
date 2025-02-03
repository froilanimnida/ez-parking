import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Modal, Alert, ActivityIndicator } from "react-native";
import WebView from "react-native-webview";
import CardComponent from "@/components/CardComponent";
import PlatformType from "@/lib/platform";
import TextComponent from "@/components/TextComponent";
import LinkComponent from "@/components/LinkComponent";
import { responsiveContainer } from "@/styles/default";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "@/components/ButtonComponent";

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Haversine formula or other. Here’s a simple placeholder:
    return Math.random() * 10; // Mock distance
}

const TransactionDetails = () => {
    const transactionDetails = {
        establishment_info: {
            name: "Sample Parking Establishment",
            latitude: 14.5547,
            longitude: 121.0244,
        },
        slot_info: {
            slot_code: "SLOT-012",
            floor_level: 3,
            vehicle_type_code: "SUV",
            vehicle_type_name: "Sport Utility Vehicle",
            vehicle_type_size: "Large",
            slot_features: "Covered Parking",
            is_premium: true,
        },
        qr_code:
            "HcPIuQbfB3enQe2soIVzGx7AnLBADnnaBk1CgCSMsGp3qyW5Fz1tyz+0n6HGrMYvqTVdllhBedWi8RfWoZzsJnfers/0eSkqqNFkac5/DG4UeDVF27Sqe1vjFtTdmcFFab95LAR2+KLVQhp1q3olB2F4IPkgOImQI9EJzN8Hba0sTUyDM4IzIw496Yl9NDeO0cUsLc/okGLSQmJFS/pLCygAjPbu/MGnyUtKkXNN0YIRt1uvCcw0BDqaeT+ybTkIRmcCNTQdxmlfSVbl6Ow0V3AODCktSiQW7l/Ll8Kk0enaU0uqw4ZRVWHiUiZGq8FVd2B3BibVa5AWsSHudfq9iByCq+zHDjRIkw3jjoTJFy6J0BNxfTDhW2JLorK47XlWJ8nDvN0qvIauyo96+6vRb8/vd7auyFezWFle742LbTkVQW8U6fpnfzqnx+42YFHmO3qfo+kcB9s5GFxHtogvDjEFKUFciHUpr1mOCQZNA56cYwAfuFF1gGLV1tm5rnPG", // Base64 mock
        transaction_data: {
            transaction_id: "TXN-ABC123",
            status: "reserved", // 'active', 'completed', 'cancelled'
            payment_status: "PAID", // 'PAID', 'PARTIALLY_PAID', 'OVERDUE'
            entry_time: new Date().toISOString(),
            exit_time: "Not Available",
            amount_due: "120.00",
        },
        address_info: {
            street: "123 Main Street, ",
            city: "Makati, ",
            province: "Metro Manila, ",
            postal_code: "1200",
        },
        user_plate_number: "ABC-1234",
        contact_number: "0917-123-4567",
    };
    // ---------------------------------------------------------------------------

    // Local states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [userLatitude, setUserLatitude] = useState(0);
    const [userLongitude, setUserLongitude] = useState(0);
    const [loadingLocation, setLoadingLocation] = useState(true);

    const establishmentLatitude = transactionDetails.establishment_info.latitude;
    const establishmentLongitude = transactionDetails.establishment_info.longitude;

    // Mock "mapUrl" for WebView
    const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${establishmentLatitude},${establishmentLongitude}+(${encodeURIComponent(
        transactionDetails.establishment_info.name
    )})&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

    // Fetch user location when mounted
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
        return () => {
            // cleanup or reset if needed
        };
    }, []);

    const handleCancelTransaction = () => {
        setIsCancelModalOpen(false);
        Alert.alert("Transaction cancelled.");
    };

    const distanceKm =
        transactionDetails.transaction_data.status === "reserved"
            ? calculateDistance(establishmentLatitude, establishmentLongitude, userLatitude, userLongitude).toFixed(1)
            : null;
    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                gap: 24,
                flexDirection: "column",
                display: "flex",
                width: "100%",
            }}
        >
            {/* Back to Dashboard */}
            <LinkComponent style={styles.backLink} href="../transactions">
                ← Back to Transaction
            </LinkComponent>

            <CardComponent
                header="Transaction Details"
                subHeader={`Transaction #${transactionDetails.transaction_data.transaction_id}`}
            >
                <View style={styles.badgesRow}>
                    {transactionDetails.transaction_data.status !== "cancelled" && (
                        <View
                            style={[
                                styles.badge,
                                transactionDetails.transaction_data.payment_status === "PAID"
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
                    <TextComponent style={styles.lineValue}>{transactionDetails.user_plate_number}</TextComponent>
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

            {/* Establishment Details */}

            <CardComponent header="Establishment Details">
                <View style={styles.lineRow}>
                    <TextComponent style={styles.lineLabel}>Name</TextComponent>
                    <TextComponent style={styles.lineValue}>{transactionDetails.establishment_info.name}</TextComponent>
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

                {/* Distance if reserved */}
                {transactionDetails.transaction_data.status === "reserved" && (
                    <View style={styles.lineRow}>
                        <TextComponent style={styles.lineLabel}>Distance</TextComponent>
                        {loadingLocation ? (
                            <ActivityIndicator />
                        ) : (
                            <TextComponent style={styles.lineValue}>Approximately {distanceKm} km away</TextComponent>
                        )}
                    </View>
                )}

                {/* Direction Links */}
                <View style={styles.lineRow}>
                    <TextComponent style={styles.lineLabel}>Get Directions</TextComponent>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <LinkComponent
                            style={[styles.directionLink, { marginRight: 16 }]}
                            href={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${
                                transactionDetails.establishment_info.latitude
                            },${transactionDetails.establishment_info.longitude}+(${encodeURIComponent(
                                transactionDetails.establishment_info.name
                            )})&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                        >
                            Google Maps
                        </LinkComponent>
                        <LinkComponent
                            style={[styles.directionLink, { marginRight: 16 }]}
                            href={`https://www.waze.com/ul?ll=${transactionDetails.establishment_info.latitude},${transactionDetails.establishment_info.longitude}&navigate=yes`}
                        >
                            Waze
                        </LinkComponent>
                        <LinkComponent style={styles.directionLink} href="./">
                            Our Map
                        </LinkComponent>
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
                    <TextComponent style={styles.lineValue}>{transactionDetails.slot_info.slot_code}</TextComponent>
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
                            {/* <Image
                                source={{ uri: `data:image/png;base64,${transactionDetails.qr_code}` }}
                                style={{ width: 100, height: 100, marginBottom: 16 }}
                            /> */}
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

            {/* Cancel Transaction Button */}
            <View style={styles.footer}>
                <ButtonComponent
                    title={
                        transactionDetails.transaction_data.status === "cancelled"
                            ? "Transaction Cancelled"
                            : "Cancel Transaction"
                    }
                    style={[
                        styles.cancelButton,
                        transactionDetails.transaction_data.status === "cancelled" && styles.cancelButtonDisabled,
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
                            <Pressable style={styles.modalCancelBtn} onPress={() => setIsCancelModalOpen(false)}>
                                <Text style={styles.modalCancelText}>No, keep it</Text>
                            </Pressable>
                            <Pressable style={styles.modalConfirmBtn} onPress={handleCancelTransaction}>
                                <Text style={styles.modalConfirmText}>Yes, cancel transaction</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>

            <Modal visible={isModalOpen} transparent animationType="fade" onRequestClose={() => setIsModalOpen(false)}>
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
        </ScrollView>
    );
};

export default TransactionDetails;

const styles = StyleSheet.create({
    backLink: {
        margin: 16,
        alignSelf: "flex-start",
        fontWeight: "600",
    },
    backLinkText: {
        color: "#3b82f6",
        fontSize: 16,
    },
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
    directionLink: {
        color: "#fff",
        fontSize: 14,
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
