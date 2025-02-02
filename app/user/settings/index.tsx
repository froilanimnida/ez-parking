import LinkComponent from "@/components/LinkComponent";
import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import CardComponent from "@/components/CardComponent";
import TextComponent from "@/components/TextComponent";
import TextInputComponent from "@/components/TextInputComponent";
import { defaultBodyStyles, responsiveContainer } from "@/styles/default";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "@/components/ButtonComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

export default function UserProfileScreen() {
    const [isUpdating, setIsUpdating] = useState(false);

    const userData = {
        uuid: "user-uuid-12345",
        first_name: "John",
        last_name: "Doe",
        middle_name: "David",
        suffix: "Jr.",
        nickname: "Johnny",
        phone_number: "123-4567",
        email: "john.doe@example.com",
        role: "user",
        created_at: "2023-03-12T10:00:00Z",
        plate_number: "XYZ-1234",
        is_verified: true,
    };

    const joinDate = new Date(userData.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleSubmit = () => {
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            alert("Profile updated successfully");
        }, 1500);
    };

    return (
        <ResponsiveContainer>
            <LinkComponent style={{ width: "auto", marginBottom: 16 }} href="../user">
                ← Back to Dashboard
            </LinkComponent>

            <CardComponent header="User Profile" subHeader="Edit your profile information" customStyles={styles.card}>
                <View style={styles.headerRow}>
                    <View style={styles.avatarContainer}>
                        <TextComponent style={styles.avatarText}>
                            {userData.first_name?.[0]}
                            {userData.last_name?.[0]}
                        </TextComponent>
                    </View>
                    <View>
                        <TextComponent style={styles.headerName}>
                            {userData.first_name} {userData.last_name}
                        </TextComponent>
                        {userData.nickname ? (
                            <TextComponent style={styles.headerNickname}>@{userData.nickname}</TextComponent>
                        ) : null}
                    </View>
                    {userData.is_verified && (
                        <View style={styles.verifiedBadge}>
                            <TextComponent style={styles.verifiedBadgeText}>Verified Account</TextComponent>
                        </View>
                    )}
                </View>
            </CardComponent>

            {/* Edit Profile Form */}
            <CardComponent header="Edit Profile" customStyles={styles.card} subHeader="Update your profile information">
                <View style={styles.formGroup}>
                    <TextComponent style={styles.label}>First Name</TextComponent>
                    <TextInputComponent customStyles={styles.input} value={userData.first_name} />
                </View>
                <View style={styles.formGroup}>
                    <TextComponent style={styles.label}>Last Name</TextComponent>
                    <TextInputComponent customStyles={styles.input} defaultValue={userData.last_name} />
                </View>
                <View style={styles.formGroup}>
                    <TextComponent style={styles.label}>Middle Name</TextComponent>
                    <TextInputComponent customStyles={styles.input} defaultValue={userData.middle_name} />
                </View>
                <View style={styles.formGroup}>
                    <TextComponent style={styles.label}>Suffix</TextComponent>
                    <TextInputComponent customStyles={styles.input} defaultValue={userData.suffix} />
                </View>
                <View style={styles.formGroup}>
                    <TextComponent style={styles.label}>Nickname</TextComponent>
                    <TextInputComponent customStyles={styles.input} defaultValue={userData.nickname} />
                </View>
                <View style={styles.formGroup}>
                    <TextComponent style={styles.label}>Phone Number</TextComponent>
                    <TextInputComponent customStyles={styles.input} defaultValue={userData.phone_number} />
                </View>

                <View style={styles.buttonRow}>
                    {isUpdating ? (
                        <>
                            <ActivityIndicator color="#fff" />
                        </>
                    ) : (
                        <ButtonComponent
                            title="Save Changes"
                            onPress={() => {
                                alert("Saved");
                            }}
                        />
                    )}
                </View>
            </CardComponent>

            <View style={styles.infoWrapper}>
                <CardComponent header="Account Information">
                    <TextComponent style={styles.sectionTitle}>Account Information</TextComponent>
                    <View style={styles.infoItem}>
                        <TextComponent style={styles.infoLabel}>Email</TextComponent>
                        <TextComponent style={styles.infoValue}>{userData.email}</TextComponent>
                    </View>
                    <View style={styles.infoItem}>
                        <TextComponent style={styles.infoLabel}>Role</TextComponent>
                        <TextComponent style={styles.infoValue}>{userData.role}</TextComponent>
                    </View>
                    <View style={styles.infoItem}>
                        <TextComponent style={styles.infoLabel}>Member Since</TextComponent>
                        <TextComponent style={styles.infoValue}>{joinDate}</TextComponent>
                    </View>
                    <View style={styles.infoItem}>
                        <TextComponent style={styles.infoLabel}>Plate Number</TextComponent>
                        <TextComponent style={styles.infoValue}>{userData.plate_number}</TextComponent>
                    </View>
                </CardComponent>

                <CardComponent header="Account Details">
                    <TextComponent style={styles.sectionTitle}>Account Details</TextComponent>
                    <View style={styles.infoItem}>
                        <TextComponent style={styles.infoLabel}>Account ID</TextComponent>
                        <TextComponent style={styles.infoValue}>{userData.uuid}</TextComponent>
                    </View>
                    <View style={styles.infoItem}>
                        <TextComponent style={styles.infoLabel}>Verification Status</TextComponent>
                        <TextComponent style={styles.infoValue}>
                            {userData.is_verified ? "Verified" : "Not Verified"}
                        </TextComponent>
                    </View>
                </CardComponent>
            </View>
        </ResponsiveContainer>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    avatarContainer: {
        width: 64,
        height: 64,
        backgroundColor: "#c7d2fe",
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4f46e5",
    },
    headerName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
    },
    headerNickname: {
        fontSize: 14,
        color: "#6b7280",
    },
    verifiedBadge: {
        backgroundColor: "#dcfce7",
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    verifiedBadgeText: {
        fontSize: 12,
        color: "#166534",
        fontWeight: "600",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        color: "#111827",
    },
    formGroup: { marginBottom: 12 },
    label: { fontSize: 14, color: "#374151", marginBottom: 4 },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 4,
        padding: 8,
        fontSize: 14,
        color: "#111827",
    },
    buttonRow: { alignItems: "flex-end" },
    saveButton: {
        backgroundColor: "#4f46e5",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    saveButtonDisabled: {
        opacity: 0.5,
    },
    infoWrapper: { flexDirection: "column", gap: 16 },
    infoItem: { marginBottom: 12 },
    infoLabel: { fontSize: 12, color: "#6b7280" },
    infoValue: { fontSize: 14, color: "#111827" },
});
