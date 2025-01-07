import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Platform, StatusBar } from "react-native";
import { useCameraPermissions } from "expo-camera";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import TextComponent from "@/components/TextComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ParkingManagerDashboard = () => {
    const [permission, requestPermission] = useCameraPermissions();
    useEffect(() => {
        requestPermission();
    });
    const actionCards = [
        {
            title: "Quick Actions",
            items: [
                {
                    name: "Scan Entry QR",
                    href: "/parking-manager/scan",
                    icon: "qrcode-scan",
                    description: "Scan QR code for vehicle entry",
                },
                {
                    name: "Process Exit",
                    href: "/parking-manager/scan",
                    icon: "exit-to-app",
                    description: "Process vehicle exit",
                },
            ],
        },
        {
            title: "Manage Parking",
            items: [
                {
                    name: "Manage Slots",
                    href: "/parking-manager/settings/slots",
                    icon: "car-parking-lights",
                    description: "Update parking details and settings",
                },
                {
                    name: "Manage Schedules",
                    href: "/parking-manager/settings/schedule",
                    icon: "clock-outline",
                    description: "Manage operating hours",
                },
            ],
        },
        {
            title: "Reports & Analytics",
            items: [
                {
                    name: "Transactions",
                    href: "/parking-manager/transactions",
                    icon: "receipt",
                    description: "View transaction history",
                },
                {
                    name: "Reports",
                    href: "/parking-manager/reports",
                    icon: "chart-box-outline",
                    description: "View analytics and reports",
                },
                {
                    name: "Settings",
                    href: "/parking-manager/settings",
                    icon: "cog-outline",
                    description: "Manage account settings",
                },
            ],
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TextComponent variant="h1">Parking Manager Dashboard</TextComponent>
                </View>

                {actionCards.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <TextComponent variant="h2" style={styles.sectionTitle}>
                            {section.title}
                        </TextComponent>
                        <View style={styles.grid}>
                            {section.items.map((item, index) => (
                                <Link href={item.href} key={index} asChild>
                                    <TouchableOpacity style={styles.card}>
                                        <View style={styles.iconContainer}>
                                            <MaterialCommunityIcons name={item.icon} size={24} color="#4F46E5" />
                                        </View>
                                        <TextComponent variant="h3" style={styles.cardTitle}>
                                            {item.name}
                                        </TextComponent>
                                        <TextComponent variant="caption" style={styles.cardDescription}>
                                            {item.description}
                                        </TextComponent>
                                    </TouchableOpacity>
                                </Link>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        padding: 16,
        marginBottom: 16,
    },
    section: {
        marginBottom: 24,
        padding: 16,
    },
    sectionTitle: {
        color: "#374151",
        marginBottom: 12,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        width: "47%",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        elevation: 2,
    },
    iconContainer: {
        backgroundColor: "#EEF2FF",
        padding: 8,
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    cardTitle: {
        marginBottom: 4,
    },
    cardDescription: {
        color: "#6B7280",
    },
});

export default ParkingManagerDashboard;
