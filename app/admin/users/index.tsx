import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import { Picker } from "@react-native-picker/picker";
import type { User } from "@/lib/models/user";
import { getAuthHeaders } from "@/lib/credentialsManager";
import axiosInstance from "@/lib/axiosInstance";
import ButtonComponent from "@/components/ButtonComponent";
import { defaultBodyStyles, defaultContainerStyles } from "@/styles/default";
import TextInputComponent from "@/components/TextInputComponent";
import SelectComponent from "@/components/SelectComponent";

const fetchUsers = async () => {
    const cookiesObject = await getAuthHeaders();
    const res = await axiosInstance.get(`${process.env.EXPO_PUBLIC_API_ADMIN_ROOT}/users`, {
        headers: {
            Authorization: cookiesObject.Authorization,
            "X-CSRF-TOKEN": cookiesObject["X-CSRF-TOKEN"],
            csrf_refresh_token: cookiesObject.csrf_refresh_token,
            refresh_token_cookie: cookiesObject.refresh_token_cookie,
        },
    });
    return res.data.data as User[];
};

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [verificationFilter, setVerificationFilter] = useState("all");
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUsers();
            setUsers(data);
        };
        fetchData();
    }, []);

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.first_name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesVerification =
            verificationFilter === "all" || user.is_verified === (verificationFilter === "verified");
        return matchesSearch && matchesRole && matchesVerification;
    });

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.body}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignContent: "center" }}>
                    <View style={styles.body}>
                        <View style={styles.header}>
                            <TextComponent bold variant="h1">
                                Users
                            </TextComponent>
                            <TextComponent style={styles.subtitle}>Manage user accounts and permissions</TextComponent>
                            <ButtonComponent
                                style={styles.exportButton}
                                onPress={() => {}}
                                title="Export Users"
                            ></ButtonComponent>
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

                        {filteredUsers.length === 0 ? (
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
                                        <TextComponent style={styles.userPlate}>
                                            {user.plate_number || "N/A"}
                                        </TextComponent>
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
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default Users;

const styles = StyleSheet.create({
    container: {
        ...defaultContainerStyles,
    },
    body: {
        ...defaultBodyStyles,
    },
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
        flexDirection: "row",
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
