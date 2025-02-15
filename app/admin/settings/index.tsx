import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import TextInputComponent from "@/components/TextInputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

interface UserData {
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
}

const AdminSettings = () => {
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

    const handleSave = async () => {
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            alert("Changes saved successfully!");
        }, 2000);
    };

    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1" style={styles.header}>
                Account Settings
            </TextComponent>

            <CardComponent
                customStyles={styles.section}
                header="System Information"
                subHeader="View your system details"
            >
                <View style={styles.grid}>
                    <TextInputComponent
                        placeholder="User ID"
                        value={String(userData.user_id)}
                        editable={false}
                        customStyles={styles.disabledInput}
                    />
                    <TextInputComponent
                        placeholder="UUID"
                        value={userData.uuid}
                        editable={false}
                        customStyles={styles.disabledInput}
                    />
                    <TextInputComponent
                        placeholder="Role"
                        value={userData.role}
                        editable={false}
                        customStyles={styles.disabledInput}
                    />
                    <TextInputComponent
                        placeholder="Member Since"
                        value={new Date(userData.created_at).toLocaleDateString()}
                        editable={false}
                        customStyles={styles.disabledInput}
                    />
                </View>
            </CardComponent>

            {/* Personal Information */}
            <CardComponent
                customStyles={styles.section}
                header="Personal Information"
                subHeader="Update your personal details"
            >
                <View style={styles.grid}>
                    <TextInputComponent
                        placeholder="Enter your first name"
                        value={userData.first_name}
                        onChangeText={(text) => setUserData({ ...userData, first_name: text })}
                    />
                    <TextInputComponent
                        placeholder="Enter your middle name"
                        value={userData.middle_name}
                        onChangeText={(text) => setUserData({ ...userData, middle_name: text })}
                    />
                    <TextInputComponent
                        placeholder="Enter your last name"
                        value={userData.last_name}
                        onChangeText={(text) => setUserData({ ...userData, last_name: text })}
                    />
                    <TextInputComponent
                        placeholder="Enter your suffix"
                        value={userData.suffix}
                        onChangeText={(text) => setUserData({ ...userData, suffix: text })}
                    />
                    <TextInputComponent
                        placeholder="Enter your nickname"
                        value={userData.nickname}
                        onChangeText={(text) => setUserData({ ...userData, nickname: text })}
                    />
                </View>
            </CardComponent>

            <CardComponent
                customStyles={styles.section}
                header="Contact Information"
                subHeader="Update your contact details"
            >
                <View style={styles.grid}>
                    <TextInputComponent
                        placeholder="Enter your email address"
                        value={userData.email}
                        editable={false}
                        customStyles={styles.disabledInput}
                    />
                    <TextInputComponent
                        placeholder="Enter your phone number"
                        value={userData.phone_number}
                        onChangeText={(text) => setUserData({ ...userData, phone_number: text })}
                    />
                </View>
            </CardComponent>

            <View style={styles.buttonContainer}>
                <ButtonComponent
                    onPress={handleSave}
                    disabled={isUpdating}
                    loading={isUpdating}
                    title={`${isUpdating}` ? "Saving..." : "Save Changes"}
                />
            </View>
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
        maxWidth: 768,
        width: "100%",
        alignSelf: "center",
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
        color: "#6B7280",
        marginTop: 4,
    },
    section: {
        marginBottom: 24,
        padding: 16,
    },
    grid: {
        gap: 16,
    },
    disabledInput: {
        backgroundColor: "#F3F4F6",
    },
    buttonContainer: {
        marginTop: 24,
        color: "#fff",
        alignItems: "flex-end",
    },
});

export default AdminSettings;
