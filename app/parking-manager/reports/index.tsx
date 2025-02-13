import { StyleSheet, View } from "react-native";
import React from "react";
import TextComponent from "@/components/TextComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import CardComponent from "@/components/CardComponent";
import LinkComponent from "@/components/LinkComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import type { RelativePathString } from "expo-router";

interface ReportCard {
    title: string;
    description: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    // route: RelativePathString;
}

const reportCards: ReportCard[] = [
    {
        title: "Occupancy Report",
        description: "View current and historical parking space occupancy rates",
        icon: "car-parking-lights",
        // route: "/parking-manager/reports/occupancy",
    },
    {
        title: "Revenue Analysis",
        description: "Track parking revenue and financial performance",
        icon: "cash-register",
        // route: "/parking-manager/reports/revenue",
    },
    {
        title: "Peak Hours",
        description: "Analyze busy periods and parking patterns",
        icon: "clock-time-eight",
        // route: "/parking-manager/reports/peak-hours",
    },
    {
        title: "Vehicle Distribution",
        description: "See the types of vehicles using your facility",
        icon: "car-multiple",
        // route: "/parking-manager/reports/vehicle-dist",
    },
    {
        title: "Duration Statistics",
        description: "View average parking duration metrics",
        icon: "timer-outline",
        // route: "/parking-manager/reports/duration-stats",
    },
    {
        title: "Payment Analytics",
        description: "Analyze payment methods and patterns",
        icon: "credit-card-outline",
        // route: "/parking-manager/reports/payment-stats",
    },
    {
        title: "Space Utilization",
        description: "Monitor parking space efficiency",
        icon: "parking",
        // route: "/parking-manager/reports/utilization",
    },
    {
        title: "Premium Analysis",
        description: "Evaluate premium parking performance",
        icon: "star-outline",
        // route: "/parking-manager/reports/premium-analysis",
    },
    {
        title: "Trends & Forecasts",
        description: "View parking trends and predictions",
        icon: "trending-up",
        // route: "/parking-manager/reports/trends",
    },
];

const Reports = () => {
    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1" style={styles.header}>
                Reports & Analytics
            </TextComponent>
            {reportCards.map((card, index) => (
                <LinkComponent key={index} href={`/parking-manager`}>
                    <CardComponent header={`${card.title}`} customStyles={styles.card}>
                        <View style={styles.cardContent}>
                            <MaterialCommunityIcons name={card.icon} size={24} color="#0284c7" style={styles.icon} />
                            <View style={styles.textContainer}>
                                <TextComponent style={styles.description}>{card.description}</TextComponent>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color="#64748b" />
                        </View>
                    </CardComponent>
                </LinkComponent>
            ))}
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    container: {
        padding: 16,
        gap: 16,
    },
    card: {
        padding: 16,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    icon: {
        width: 24,
        height: 24,
    },
    textContainer: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontSize: 16,
        color: "#0f172a",
    },
    description: {
        fontSize: 14,
        color: "#64748b",
    },
});

export default Reports;
