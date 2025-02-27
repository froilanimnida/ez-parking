import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import type { User } from "@/lib/models/user";
import TextInputComponent from "@/components/TextInputComponent";
import SelectComponent from "@/components/SelectComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { getAllUsers } from "@/lib/api/admin";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import LinkComponent from "@components/LinkComponent";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [verificationFilter, setVerificationFilter] = useState("all");
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllUsers();
            setUsers(data.data.data);
            setLoading(false);
        };
        fetchData().then();
    }, []);

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.first_name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesVerification =
            verificationFilter === "all" || user.is_verified === (verificationFilter === "verified");
        return matchesSearch && matchesRole && matchesVerification;
    });

    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent variant="outline" style={{ marginBottom: 16 }} href="./" label="← Back to Dashboard" />
            </View>
            <View style={styles.filters}>
                <TextInputComponent
                    customStyles={styles.searchInput}
                    placeholder="Search users..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <SelectComponent
                    items={[
                        {
                            label: "All Roles",
                            value: "all",
                        },
                        {
                            label: "User",
                            value: "user",
                        },
                        {
                            label: "Parking Manager",
                            value: "parking_manager",
                        },
                        {
                            label: "Admin",
                            value: "admin",
                        },
                    ]}
                    onValueChange={setRoleFilter}
                    selectedValue={roleFilter}
                />
                <SelectComponent
                    items={[
                        {
                            label: "All Status",
                            value: "all",
                        },
                        {
                            label: "Verified",
                            value: "verified",
                        },
                        {
                            label: "Unverified",
                            value: "unverified",
                        },
                    ]}
                    onValueChange={setVerificationFilter}
                    selectedValue={verificationFilter}
                />
            </View>
            {loading && <LoadingComponent text="Fetching all users" />}

            {filteredUsers.length === 0 && !loading ? (
                <CardComponent customStyles={styles.noUsersCard} header="No Users Found">
                    <TextComponent style={styles.noUsersText}>No users found</TextComponent>
                </CardComponent>
            ) : (
                <View style={styles.userList}>
                    {filteredUsers.map((user, index) => (
                        <CardComponent key={index} customStyles={styles.userCard} header="User Details">
                            <View style={styles.userHeader}>
                                <View style={styles.userAvatar}>
                                    <TextComponent style={styles.userAvatarText}>
                                        {user.first_name?.[0]}
                                        {user.last_name?.[0]}
                                    </TextComponent>
                                </View>
                                <View style={styles.userInfo}>
                                    <TextComponent style={styles.userName}>
                                        {user.first_name} {user.middle_name} {user.last_name} {user.suffix}
                                    </TextComponent>
                                    <TextComponent style={styles.userNickname}>
                                        {user.nickname || "No nickname"}
                                    </TextComponent>
                                </View>
                            </View>
                            <TextComponent style={styles.userEmail}>{user.email}</TextComponent>
                            <TextComponent style={styles.userPhone}>{user.phone_number}</TextComponent>
                            <View style={styles.userRole}>
                                <TextComponent
                                    style={[
                                        styles.userRoleText,
                                        user.role === "admin" && styles.roleAdmin,
                                        user.role === "parking_manager" && styles.roleManager,
                                        user.role === "user" && styles.roleUser,
                                    ]}
                                >
                                    {user.role}
                                </TextComponent>
                            </View>
                            <View style={styles.userStatus}>
                                <TextComponent
                                    style={[
                                        styles.userStatusText,
                                        user.is_verified ? styles.statusVerified : styles.statusUnverified,
                                    ]}
                                >
                                    {user.is_verified ? "Verified" : "Unverified"}
                                </TextComponent>
                            </View>
                            <TextComponent style={styles.userPlate}>{user.plate_number || "N/A"}</TextComponent>
                            <View style={styles.userActions}>
                                {user.role === "user" && (
                                    <TouchableOpacity onPress={() => setIsBanModalOpen(true)}>
                                        <TextComponent style={styles.banButton}>Ban</TextComponent>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </CardComponent>
                    ))}
                </View>
            )}
        </ResponsiveContainer>
    );
};

export default Users;

const styles = StyleSheet.create({
    header: {
        marginBottom: 16,
    },
    subtitle: {
        color: "#6B7280",
        marginTop: 4,
    },
    exportButton: {
        backgroundColor: "#4F46E5",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    exportButtonText: {
        color: "white",
    },
    filters: {
        flexDirection: "column",
        gap: 16,
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    picker: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    noUsersCard: {
        padding: 16,
    },
    noUsersText: {
        textAlign: "center",
        color: "#6B7280",
    },
    userList: {
        gap: 16,
    },
    userCard: {
        padding: 16,
        marginBottom: 16,
    },
    userHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    userAvatar: {
        backgroundColor: "#6B7280",
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    userAvatarText: {
        color: "white",
        fontWeight: "bold",
    },
    userInfo: {
        marginLeft: 16,
    },
    userName: {
        fontWeight: "bold",
    },
    userNickname: {
        color: "#6B7280",
    },
    userEmail: {
        color: "#6B7280",
        marginBottom: 8,
    },
    userPhone: {
        color: "#6B7280",
        marginBottom: 8,
    },
    userRole: {
        marginBottom: 8,
        width: "auto",
    },
    userRoleText: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
    },
    roleAdmin: {
        backgroundColor: "#E9D5FF",
        color: "#7C3AED",
    },
    roleManager: {
        backgroundColor: "#BFDBFE",
        color: "#1D4ED8",
    },
    roleUser: {
        backgroundColor: "#D1FAE5",
        color: "#065F46",
    },
    userStatus: {
        marginBottom: 8,
    },
    userStatusText: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
    },
    statusVerified: {
        backgroundColor: "#D1FAE5",
        color: "#065F46",
    },
    statusUnverified: {
        backgroundColor: "#FEF3C7",
        color: "#92400E",
    },
    userPlate: {
        color: "#6B7280",
        marginBottom: 8,
    },
    userActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
    },
    banButton: {
        color: "#DC2626",
    },
});
