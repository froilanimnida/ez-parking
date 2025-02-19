import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import TextInputComponent from "@/components/TextInputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { logoutCurrentUser } from "@lib/credentialsManager";
import LinkComponent from "@components/LinkComponent";
import LoadingComponent from "@components/reusable/LoadingComponent";
import { User } from "@lib/models/user";

const AdminSettings = () => {
    const [userData, setUserData] = useState<User>();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleSave = async () => {
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            alert("Changes saved successfully!");
        }, 2000);
    };

    return (
        <ResponsiveContainer>
            <LinkComponent label=" ← Back to Dashboard" style={{ width: "auto", marginBottom: 16 }} href="../user" />
            {isLoading || isUpdating ? (
                <LoadingComponent text="Loading..." />
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

                            <ButtonComponent title="Save Changes" onPress={() => alert("Saved")} disabled={isLoading} />
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
};

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
    infoWrapper: { flexDirection: "column", gap: 16 },
    infoItem: { marginBottom: 12 },
    infoLabel: { fontSize: 12, color: "#6b7280" },
    infoValue: { fontSize: 14, color: "#111827" },
});
export default AdminSettings;
