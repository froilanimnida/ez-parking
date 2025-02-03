import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import SelectComponent from "@/components/SelectComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import ButtonComponent from "@/components/ButtonComponent";

const TransactionDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("paid");

    // Mocked transaction details data
    const transactionDetails = {
        parking_slot_info: {
            slot_code: "SLOT-012",
            floor_level: 3,
            slot_features: "Covered Parking",
            slot_multiplier: 1.5,
            base_rate: 50,
            is_premium: true,
        },
        transaction_data: {
            transaction_id: "TXN-ABC123",
            amount_due: "120.00",
            payment_status: "PAID",
            status: "active",
            entry_time: new Date().toISOString(),
        },
        user_info: {
            user_id: "user-123",
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            phone_number: "123-4567",
            role: "user",
            is_verified: true,
        },
    };

    const handleUpdateStatus = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert("Payment status updated successfully");
        }, 1500);
    };

    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1" style={{ marginBottom: 16 }}>
                Transaction Details
            </TextComponent>
            <View style={styles.grid}>
                <CardComponent
                    header="Transaction Details"
                    subHeader="All details about the transaction"
                    customStyles={styles.card}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Transaction ID</TextComponent>
                            <TextComponent variant="body">
                                {transactionDetails.transaction_data.transaction_id}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Amount Due</TextComponent>
                            <TextComponent variant="body">
                                ₱{transactionDetails.transaction_data.amount_due}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Payment Status</TextComponent>
                            <TextComponent variant="body">
                                {transactionDetails.transaction_data.payment_status}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Status</TextComponent>
                            <TextComponent variant="body">{transactionDetails.transaction_data.status}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Entry Time</TextComponent>
                            <TextComponent variant="body">
                                {new Date(transactionDetails.transaction_data.entry_time).toLocaleString()}
                            </TextComponent>
                        </View>
                    </View>
                </CardComponent>

                {/* Slot Details */}
                <CardComponent
                    header="Slot Details"
                    subHeader="Details about the parking slot"
                    customStyles={styles.card}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Slot Code</TextComponent>
                            <TextComponent variant="body">
                                {transactionDetails.parking_slot_info.slot_code}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Floor Level</TextComponent>
                            <TextComponent variant="body">
                                {transactionDetails.parking_slot_info.floor_level}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Features</TextComponent>
                            <TextComponent variant="body">
                                {transactionDetails.parking_slot_info.slot_features}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Rate Multiplier</TextComponent>
                            <TextComponent variant="body">
                                {transactionDetails.parking_slot_info.slot_multiplier}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Base Rate</TextComponent>
                            <TextComponent variant="body">
                                ₱{transactionDetails.parking_slot_info.base_rate}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Premium Slot</TextComponent>
                            <TextComponent variant="body">
                                {transactionDetails.parking_slot_info.is_premium ? "Yes" : "No"}
                            </TextComponent>
                        </View>
                    </View>
                </CardComponent>

                {/* User Details */}
                <CardComponent header="User Details" subHeader="Details about the user" customStyles={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">User ID</TextComponent>
                            <TextComponent variant="body">{transactionDetails.user_info.user_id}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Name</TextComponent>
                            <TextComponent variant="body">
                                {transactionDetails.user_info.first_name} {transactionDetails.user_info.last_name}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Email</TextComponent>
                            <TextComponent variant="body">{transactionDetails.user_info.email}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Phone Number</TextComponent>
                            <TextComponent variant="body">{transactionDetails.user_info.phone_number}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Role</TextComponent>
                            <TextComponent variant="body">{transactionDetails.user_info.role}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Verified</TextComponent>
                            <TextComponent variant="body">
                                {transactionDetails.user_info.is_verified ? "Yes" : "No"}
                            </TextComponent>
                        </View>
                    </View>
                </CardComponent>
            </View>

            {/* Update Payment Status */}
            <CardComponent customStyles={styles.card} header="Update Payment Status">
                <View style={styles.formGroup}>
                    <TextComponent style={styles.label}>Payment Status</TextComponent>
                    <SelectComponent
                        selectedValue={paymentStatus}
                        onValueChange={(itemValue) => setPaymentStatus(itemValue)}
                        customStyles={styles.picker}
                        items={[
                            { label: "Paid", value: "paid" },
                            { label: "Pending", value: "pending" },
                        ]}
                    />
                </View>
                <View style={styles.buttonRow}>
                    <ButtonComponent onPress={handleUpdateStatus} style={styles.updateButton} disabled={isLoading}>
                        <TextComponent style={styles.updateButtonText}>
                            {isLoading ? "Updating..." : "Update Status and Allow Entry"}
                        </TextComponent>
                    </ButtonComponent>
                </View>
            </CardComponent>
        </ResponsiveContainer>
    );
};

export default TransactionDetails;

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        flex: 1,
        minWidth: "45%",
        marginBottom: 16,
        elevation: 2,
    },
    cardContent: {
        flexDirection: "column",
        gap: 8,
    },
    cardItem: {
        marginBottom: 8,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 4,
    },
    picker: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 4,
        padding: 8,
        fontSize: 14,
        color: "#111827",
    },
    buttonRow: {
        alignItems: "flex-end",
    },
    updateButton: {
        backgroundColor: "#4f46e5",
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});
