import LinkComponent from "@/components/LinkComponent";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import CardComponent from "@/components/CardComponent";
import TextComponent from "@/components/TextComponent";
import TextInputComponent from "@/components/TextInputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { logoutCurrentUser } from "@/lib/credentialsManager";
import { type User } from "@/lib/models/user";
import LoadingComponent from "@components/reusable/LoadingComponent";
import { fetchProfile } from "@lib/api/user";

export default function UserProfileScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<User | null>(null);
    const joinDate = userData
        ? new Date(userData.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProfile();
                setUserData(response.data.message);
            } catch (error) {
                alert("Error fetching user profile");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData().then();
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert("Profile updated successfully");
        }, 1500);
    };
    return (
        <ResponsiveContainer>
            <LinkComponent label=" ← Back to Dashboard" style={{ width: "auto", marginBottom: 16 }} href="../user" />
            {isLoading ? (
                <LoadingComponent text="Loading user profile..." />
            ) : (
                userData && (
                    <>
                        <CardComponent
                            header="User Profile"
                            subHeader="Edit your profile information"
                            customStyles={styles.card}
                        >
                            <View style={styles.headerRow}>
                                <View style={styles.avatarContainer}>
                                    <TextComponent style={styles.avatarText}>
                                        {userData.first_name?.charAt(0)}
                                        {userData.last_name?.charAt(0)}
                                    </TextComponent>
                                </View>
                                <View>
                                    <TextComponent style={styles.headerName}>
                                        {userData.first_name} {userData.last_name}
                                    </TextComponent>
                                    {userData.nickname && (
                                        <TextComponent style={styles.headerNickname}>
                                            @{userData.nickname}
                                        </TextComponent>
                                    )}
                                </View>
                                {userData.is_verified && (
                                    <View style={styles.verifiedBadge}>
                                        <TextComponent style={styles.verifiedBadgeText}>Verified Account</TextComponent>
                                    </View>
                                )}
                            </View>
                        </CardComponent>

                        <CardComponent
                            header="Edit Profile"
                            customStyles={styles.card}
                            subHeader="Update your profile information"
                        >
                            <View style={styles.formGroup}>
                                <TextComponent style={styles.label}>First Name</TextComponent>
                                <TextInputComponent customStyles={styles.input} value={userData.first_name} />
                            </View>
                            <View style={styles.formGroup}>
                                <TextComponent style={styles.label}>Last Name</TextComponent>
                                <TextInputComponent customStyles={styles.input} value={userData.last_name} />
                            </View>
                            <View style={styles.formGroup}>
                                <TextComponent style={styles.label}>Middle Name</TextComponent>
                                <TextInputComponent customStyles={styles.input} value={userData.middle_name} />
                            </View>
                            <View style={styles.formGroup}>
                                <TextComponent style={styles.label}>Suffix</TextComponent>
                                <TextInputComponent customStyles={styles.input} value={userData.suffix ?? ""} />
                            </View>
                            <View style={styles.formGroup}>
                                <TextComponent style={styles.label}>Nickname</TextComponent>
                                <TextInputComponent customStyles={styles.input} value={userData.nickname ?? ""} />
                            </View>
                            <View style={styles.formGroup}>
                                <TextComponent style={styles.label}>Phone Number</TextComponent>
                                <TextInputComponent customStyles={styles.input} value={userData.phone_number} />
                            </View>

                            <ButtonComponent title="Save Changes" onPress={() => handleSubmit()} disabled={isLoading} />
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

                            <ButtonComponent onPress={() => logoutCurrentUser()} title="Logout" variant="destructive" />
                        </View>
                    </>
                )
            )}
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
