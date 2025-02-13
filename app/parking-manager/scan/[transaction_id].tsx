import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import SelectComponent from "@/components/SelectComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { router, useLocalSearchParams } from "expo-router";
import { allowTransaction, qrContentOverview } from "@/lib/api/parkingManager";
import type { ParkingSlot } from "@/lib/models/parking-slot";
import type { Transaction } from "@/lib/models/transaction";
import type { User } from "@/lib/models/user";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import type { AxiosError } from "axios";

interface qrContent {
    parking_slot_info: ParkingSlot;
    transaction_data: Transaction;
    user_info: User;
}

const QRContent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<"paid" | "pending">("paid");
    const [qrContent, setQrContent] = useState<qrContent | null>(null);
    const { transaction_id } = useLocalSearchParams() as { transaction_id: string };
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        const fetchqrContent = async () => {
            try {
                const result = await qrContentOverview(transaction_id);
                setQrContent(result.data.data);
                setIsFetching(false);
            } catch (error) {
                console.log(error);
                alert("Error fetching transaction details");
            } finally {
                router.replace("/parking-manager/scan");
            }
        };
        fetchqrContent();
    }, [transaction_id]);

    const handleUpdateStatus = async () => {
        setIsLoading(true);
        try {
            const result = await allowTransaction(transaction_id, paymentStatus);
            if (result.status === 200) {
                alert("Transaction status updated successfully");
            }
        } catch (error: unknown) {
            const err = error as AxiosError;
            console.log(error);
            alert(err.response!.data?.message || "An error occurred while updating the transaction status");
        } finally {
            router.replace("/parking-manager/scan");
        }
    };

    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1" style={{ marginBottom: 16 }}>
                Transaction Details
            </TextComponent>
            {qrContent === null && isFetching && <LoadingComponent text="Loading transaction details" />}
            {!isFetching && qrContent && (
                <View style={styles.cardContainer}>
                    <CardComponent header="Transaction Details" subHeader="All details about the transaction">
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Transaction ID</TextComponent>
                            <TextComponent variant="body">{qrContent.transaction_data.transaction_id}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Amount Due</TextComponent>
                            <TextComponent variant="body">₱{qrContent.transaction_data.amount_due}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Payment Status</TextComponent>
                            <TextComponent variant="body">{qrContent.transaction_data.payment_status}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Status</TextComponent>
                            <TextComponent variant="body">{qrContent.transaction_data.status}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Entry Time</TextComponent>
                            <TextComponent variant="body">
                                {qrContent.transaction_data.entry_time != null
                                    ? new Date(qrContent.transaction_data.entry_time).toLocaleString()
                                    : "Not yet available"}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Exit Time</TextComponent>
                            <TextComponent variant="body">
                                {qrContent.transaction_data.exit_time != null
                                    ? new Date(qrContent.transaction_data.exit_time).toLocaleString()
                                    : "Not yet available"}
                            </TextComponent>
                        </View>
                    </CardComponent>

                    {/* Slot Details */}
                    <CardComponent header="Slot Details" subHeader="Details about the parking slot">
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Slot Code</TextComponent>
                            <TextComponent variant="body">{qrContent.parking_slot_info.slot_code}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Floor Level</TextComponent>
                            <TextComponent variant="body">{qrContent.parking_slot_info.floor_level}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Features</TextComponent>
                            <TextComponent variant="body">{qrContent.parking_slot_info.slot_features}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Price Multiplier</TextComponent>
                            <TextComponent variant="body">{qrContent.parking_slot_info.price_multiplier}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Base Price per Hour</TextComponent>
                            <TextComponent variant="body">
                                ₱{qrContent.parking_slot_info.base_price_per_hour}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Base Price per Day</TextComponent>
                            <TextComponent variant="body">
                                ₱{qrContent.parking_slot_info.base_price_per_day}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Base Price per Month</TextComponent>
                            <TextComponent variant="body">
                                ₱{qrContent.parking_slot_info.base_price_per_month}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Premium Slot</TextComponent>
                            <TextComponent variant="body">
                                {qrContent.parking_slot_info.is_premium ? "Yes" : "No"}
                            </TextComponent>
                        </View>
                    </CardComponent>

                    {/* User Details */}
                    <CardComponent header="User Details" subHeader="Details about the user">
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">User ID</TextComponent>
                            <TextComponent variant="body">{qrContent.user_info.uuid}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Name</TextComponent>
                            <TextComponent variant="body">
                                {qrContent.user_info.first_name} {qrContent.user_info.last_name}
                            </TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Email</TextComponent>
                            <TextComponent variant="body">{qrContent.user_info.email}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Phone Number</TextComponent>
                            <TextComponent variant="body">{qrContent.user_info.phone_number}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Role</TextComponent>
                            <TextComponent variant="body">{qrContent.user_info.role}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">Verified</TextComponent>
                            <TextComponent variant="body">
                                {qrContent.user_info.is_verified ? "Yes" : "No"}
                            </TextComponent>
                        </View>
                    </CardComponent>

                    <CardComponent header="Update Payment Status">
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
                            <ButtonComponent
                                onPress={handleUpdateStatus}
                                disabled={isLoading}
                                title={isLoading ? "Updating..." : "Update Status and Allow Entry"}
                            />
                        </View>
                    </CardComponent>
                </View>
            )}
        </ResponsiveContainer>
    );
};

export default QRContent;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "column",
        gap: 16,
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
