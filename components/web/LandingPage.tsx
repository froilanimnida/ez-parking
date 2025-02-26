import { StyleSheet, View, Image, ScrollView } from "react-native";
import React from "react";
import LinkComponent from "@components/LinkComponent";
import TextComponent from "@components/TextComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const WebLandingPage = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.navbar}>
                <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                <View style={styles.navLinks}>
                    <LinkComponent href="./auth/login" variant="outline" label="Login" />
                    <LinkComponent href="./auth/sign-up/parking-manager" variant="primary" label="Register as Owner" />
                </View>
            </View>

            <View style={styles.heroSection}>
                <View style={styles.mapOverlay}>
                    <View style={styles.heroContent}>
                        <View style={styles.searchCard}>
                            <TextComponent variant="h1" style={styles.mainTitle}>
                                Find Parking Instantly
                            </TextComponent>
                            <TextComponent style={styles.subTitle}>
                                Discover and reserve parking spaces near you in real-time
                            </TextComponent>
                            <View style={{ alignSelf: "center" }}>
                                <LinkComponent
                                    href={"./establishment"}
                                    variant="primary"
                                    label={"Search Nearby Parking"}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.statsSection}>
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <TextComponent style={styles.statNumber}>1000+</TextComponent>
                        <TextComponent style={styles.statLabel}>Parking Spaces</TextComponent>
                    </View>
                    <View style={styles.statCard}>
                        <TextComponent style={styles.statNumber}>50+</TextComponent>
                        <TextComponent style={styles.statLabel}>Locations</TextComponent>
                    </View>
                    <View style={styles.statCard}>
                        <TextComponent style={styles.statNumber}>10k+</TextComponent>
                        <TextComponent style={styles.statLabel}>Happy Users</TextComponent>
                    </View>
                </View>
            </View>

            <View style={styles.featuresSection}>
                <TextComponent style={styles.sectionTitle}>How It Works</TextComponent>
                <View style={styles.features}>
                    <View style={styles.featureCard}>
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons name="magnify" size={32} color="#4F46E5" />
                        </View>
                        <TextComponent style={styles.featureTitle}>Search</TextComponent>
                        <TextComponent style={styles.featureText}>
                            Find available parking spots near your destination
                        </TextComponent>
                    </View>
                    <View style={styles.featureCard}>
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons name="bookmark-check" size={32} color="#4F46E5" />
                        </View>
                        <TextComponent style={styles.featureTitle}>Book</TextComponent>
                        <TextComponent style={styles.featureText}>Reserve your spot with just a few taps</TextComponent>
                    </View>
                    <View style={styles.featureCard}>
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons name="car" size={32} color="#4F46E5" />
                        </View>
                        <TextComponent style={styles.featureTitle}>Park</TextComponent>
                        <TextComponent style={styles.featureText}>Follow navigation and park stress-free</TextComponent>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.95)",
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: "contain",
    },
    navLinks: {
        flexDirection: "row",
        gap: 16,
    },
    heroSection: {
        height: 700,
        position: "relative",
    },
    mapBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.8,
    },
    mapOverlay: {
        position: "relative",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    heroContent: {
        padding: 20,
        maxWidth: 1200,
        marginHorizontal: "auto",
        height: "100%",
        justifyContent: "center",
    },
    searchCard: {
        backgroundColor: "white",
        padding: 40,
        borderRadius: 16,
        maxWidth: 500,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    mainTitle: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 16,
    },
    subTitle: {
        fontSize: 20,
        color: "#4B5563",
        marginBottom: 24,
    },
    searchButton: {
        backgroundColor: "#4F46E5",
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    searchButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    downloadSection: {
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingTop: 24,
    },
    downloadText: {
        fontSize: 16,
        color: "#6B7280",
        marginBottom: 16,
    },
    storeButtons: {
        flexDirection: "row",
        gap: 16,
    },
    storeButton: {
        height: 40,
        width: 120,
        resizeMode: "contain",
    },
    statsSection: {
        backgroundColor: "#F9FAFB",
        padding: 80,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 48,
        maxWidth: 1200,
        marginHorizontal: "auto",
    },
    statCard: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#4F46E5",
    },
    statLabel: {
        fontSize: 16,
        color: "#6B7280",
    },
    featuresSection: {
        padding: 80,
        backgroundColor: "white",
    },
    sectionTitle: {
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 48,
        color: "#111827",
    },
    features: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 32,
        flexWrap: "wrap",
        maxWidth: 1200,
        marginHorizontal: "auto",
    },
    featureCard: {
        backgroundColor: "#FFFFFF",
        padding: 32,
        borderRadius: 16,
        alignItems: "center",
        width: 300,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    iconCircle: {
        width: 64,
        height: 64,
        backgroundColor: "#F3F4F6",
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        fontSize: 24,
    },
    featureTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#111827",
    },
    featureText: {
        fontSize: 16,
        color: "#6B7280",
        textAlign: "center",
    },
});

export default WebLandingPage;
