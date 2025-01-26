import CardComponent from "@/components/CardComponent";
import TextComponent from "@/components/TextComponent";
import TextInputComponent from "@/components/TextInputComponent";
import PlatformType from "@/lib/platform";
import StatusBarHeight from "@/lib/statusBar";
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

type UserData = {
    user_id: number;
    uuid: string;
    nickname: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    email: string;
    phone_number: string;
    role: string;
    created_at: string;
    is_verified: boolean;
};

export default function Settings() {
    const [userData, setUserData] = useState<UserData>({
        user_id: 1,
        uuid: "550e8400-e29b-41d4-a716-446655440000",
        nickname: "admin123",
        first_name: "Admin",
        middle_name: "",
        last_name: "User",
        suffix: "",
        email: "admin@example.com",
        phone_number: "+1234567890",
        role: "admin",
        created_at: "2024-03-27T10:00:00",
        is_verified: true,
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSave = () => {
        setIsUpdating(true);
        // Implement save logic here
        setTimeout(() => {
            setIsUpdating(false);
            alert("Changes saved successfully!");
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.body}
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignContent: "center", gap: 16 }}
            >
                <View style={styles.header}>
                    <TextComponent bold style={styles.title}>
                        Account Settings
                    </TextComponent>
                    <TextComponent style={styles.subtitle}>
                        Manage your account information and preferences
                    </TextComponent>
                </View>

                {/* System Information */}
                <CardComponent header="System Information" subHeader="View your system information">
                    <View style={styles.grid}>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">User ID</TextComponent>
                            <TextInputComponent
                                customStyles={[styles.input, styles.disabledInput]}
                                value={String(userData.user_id)}
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">UUID</TextComponent>
                            <TextInputComponent
                                customStyles={[styles.input, styles.disabledInput]}
                                value={userData.uuid}
                                editable={false}
                            />
                        </View>
                        {/* Add other system info fields */}
                    </View>
                </CardComponent>

                <CardComponent header="Personal Information" subHeader="Update your personal information">
                    <View style={styles.grid}>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">First Name</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={userData.first_name}
                                onChangeText={(text) => setUserData({ ...userData, first_name: text })}
                            />
                        </View>
                    </View>
                </CardComponent>

                <CardComponent header="Contact Information" subHeader="Update your contact information">
                    <View style={styles.grid}>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Email</TextComponent>
                            <TextInputComponent
                                customStyles={[styles.input, styles.disabledInput]}
                                value={userData.email}
                                editable={false}
                            />
                        </View>
                        {/* Add other contact info fields */}
                    </View>
                </CardComponent>

                {/* Save Button */}
                <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isUpdating}>
                    <TextComponent style={styles.buttonText}>{isUpdating ? "Saving..." : "Save Changes"}</TextComponent>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: PlatformType() === "android" ? StatusBarHeight() : 0,
        backgroundColor: "#f9fafb",
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        width: "100%",
        maxWidth: 1280,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#111827",
    },
    subtitle: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 4,
    },
    section: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#111827",
        marginBottom: 16,
    },
    grid: {
        gap: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#374151",
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 6,
        padding: 8,
        fontSize: 14,
        color: "#111827",
    },
    disabledInput: {
        backgroundColor: "#f3f4f6",
    },
    button: {
        backgroundColor: "#4f46e5",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
    },
});
