import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Platform, StatusBar } from "react-native";
import React from "react";
import { Link } from "expo-router";
import TextComponent from "@/components/TextComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const AdminDashboard = () => {
    const adminActions = [
        {
            title: "Users",
            description: "View and manage user accounts",
            icon: "account-group",
            href: "/admin/users",
        },
        {
            title: "Establishments",
            description: "Manage parking establishments",
            icon: "store",
            href: "/admin/establishments",
        },
        {
            title: "Vehicle Types",
            description: "Manage vehicle categories",
            icon: "car",
            href: "/admin/vehicle-types",
        },
        {
            title: "Settings",
            description: "Configure system settings",
            icon: "cog",
            href: "/admin/settings",
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TextComponent variant="h1">Admin Dashboard</TextComponent>
                    <TextComponent variant="body" style={styles.subtitle}>
                        Manage your platform settings and users
                    </TextComponent>
                </View>

                <View style={styles.grid}>
                    {adminActions.map((action, index) => (
                        <Link href={action.href} key={index} asChild>
                            <TouchableOpacity style={styles.card}>
                                <View style={styles.iconContainer}>
                                    <MaterialCommunityIcons name={action.icon} size={24} color="#4F46E5" />
                                </View>
                                <TextComponent variant="h3" style={styles.cardTitle}>
                                    {action.title}
                                </TextComponent>
                                <TextComponent variant="caption" style={styles.cardDescription}>
                                    {action.description}
                                </TextComponent>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        padding: 16,
        marginBottom: 16,
    },
    subtitle: {
        color: "#6B7280",
        marginTop: 4,
    },
    grid: {
        padding: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        width: "47%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
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

export default AdminDashboard;
