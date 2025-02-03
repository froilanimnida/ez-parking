import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import TextComponent from "@/components/TextComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LinkComponent from "@/components/LinkComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

interface AdminActionsType {
    title: string;
    description: string;
    icon: "account-group" | "store" | "car" | "cog";
    href: "./admin/users" | "./admin/establishments" | "./admin/vehicle-types" | "./admin/settings";
}

const AdminDashboard = () => {
    const adminActions: AdminActionsType[] = [
        {
            title: "Users",
            description: "View and manage user accounts",
            icon: "account-group",
            href: "./admin/users",
        },
        {
            title: "Establishments",
            description: "Manage parking establishments",
            icon: "store",
            href: "./admin/establishments",
        },
        {
            title: "Vehicle Types",
            description: "Manage vehicle categories",
            icon: "car",
            href: "./admin/vehicle-types",
        },
        {
            title: "Settings",
            description: "Configure system settings",
            icon: "cog",
            href: "./admin/settings",
        },
    ];

    return (
        <ResponsiveContainer>
            <View style={styles.header}>
                <TextComponent bold variant="h1">
                    Admin Dashboard
                </TextComponent>
                <TextComponent variant="body" style={styles.subtitle}>
                    Manage your platform settings and users
                </TextComponent>
            </View>

            <View style={styles.grid}>
                {adminActions.map((action, index) => (
                    <LinkComponent href={action.href} key={index} asChild>
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
                    </LinkComponent>
                ))}
            </View>
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 16,
    },
    subtitle: {
        color: "#6B7280",
        marginTop: 4,
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
        elevation: 2,
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
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
