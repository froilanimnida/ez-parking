import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LinkComponent from "@/components/LinkComponent";
import { defaultBodyStyles, defaultContainerStyles } from "@/styles/default";
import TextComponent from "@/components/TextComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
        <View style={styles.container}>
            <SafeAreaView style={styles.body}>
                <ScrollView>
                    <View style={styles.header}>
                        <TextComponent bold variant="h1">
                            Admin Dashboard
                        </TextComponent>
                        <TextComponent variant="body" style={styles.subtitle}>
                            Manage your platform settings and users
                        </TextComponent>
                    </View>

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
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default UserDashboard;

const styles = StyleSheet.create({
    container: { ...defaultContainerStyles },
    body: { ...defaultBodyStyles },
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
