import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import LinkComponent from "@/components/LinkComponent";
import TextComponent from "@/components/TextComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

interface UserActionTypes {
    title: string;
    description: string;
    icon: "credit-card" | "car" | "cog";
    href: "./user/transactions" | "./user/book" | "./user/settings";
}

const UserDashboard = () => {
    const userActions: UserActionTypes[] = [
        {
            title: "Transactions",
            description: "Manage transactions",
            icon: "credit-card",
            href: "./user/transactions",
        },
        {
            title: "Book",
            description: "Book a parking space",
            icon: "car",
            href: "./user/book",
        },
        {
            title: "Settings",
            description: "Configure settings",
            icon: "cog",
            href: "./user/settings",
        },
    ];
    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1" style={{ marginBottom: 16 }}>
                User Dashboard
            </TextComponent>

            <View style={styles.grid}>
                {userActions.map((action, index) => (
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

export default UserDashboard;

const styles = StyleSheet.create({
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
