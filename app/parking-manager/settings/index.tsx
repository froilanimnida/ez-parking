import ButtonComponent from "@/components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@/components/TextComponent";
import TextInputComponent from "@/components/TextInputComponent";
import { logoutCurrentUser } from "@/lib/credentialsManager";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

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
        <ResponsiveContainer>
            <View style={styles.header}>
                <TextComponent bold variant="h1">
                    Account Settings
                </TextComponent>
                <TextComponent style={styles.subtitle}>Manage your account information and preferences</TextComponent>
            </View>

            <CardComponent
                header="System Information"
                subHeader="View your system information"
                customStyles={styles.card}
            >
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

            <CardComponent
                customStyles={styles.card}
                header="Personal Information"
                subHeader="Update your personal information"
            >
                <View style={styles.grid}>
                    <View style={styles.inputGroup}>
                        <TextComponent variant="caption">Owner Name</TextComponent>
                        <TextInputComponent
                            customStyles={styles.input}
                            value={userData.first_name}
                            onChangeText={(text) => setUserData({ ...userData, first_name: text })}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextComponent variant="caption">Email Address</TextComponent>
                        <TextInputComponent
                            customStyles={styles.input}
                            value={userData.email}
                            onChangeText={(text) => setUserData({ ...userData, email: text })}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextComponent variant="caption">Phone Number</TextComponent>
                        <TextInputComponent
                            customStyles={styles.input}
                            value={userData.phone_number}
                            onChangeText={(text) => setUserData({ ...userData, phone_number: text })}
                        />
                    </View>
                </View>
            </CardComponent>

            <CardComponent
                customStyles={styles.card}
                header="Contact Information"
                subHeader="Update your contact information"
            >
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

            <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isUpdating}>
                <TextComponent style={styles.buttonText}>{isUpdating ? "Saving..." : "Save Changes"}</TextComponent>
            </TouchableOpacity>
            <ButtonComponent onPress={() => logoutCurrentUser()} title="Logout" variant="destructive" />
        </ResponsiveContainer>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        marginBottom: 24,
    },
    header: {
        width: "100%",
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 4,
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
        marginVertical: 16,
        borderRadius: 6,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
    },
});
