import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getTransaction } from "@/lib/api/parkingManager";
import type { ParkingSlot } from "@lib/models/parkingSlot";
import type { Transaction } from "@/lib/models/transaction";
import type { User } from "@/lib/models/user";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@/components/TextComponent";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import CardComponent from "@/components/CardComponent";
import LinkComponent from "@components/LinkComponent";

interface TransactionDetailsType {
    slot_info: ParkingSlot & { vehicle_type_name: string; vehicle_type_size: string };
    transaction: Transaction;
    user_info: User;
}

const TransactionDetails = () => {
    const { uuid } = useLocalSearchParams() as { uuid: string };
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetailsType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const transaction = async () => {
            try {
                const res = await getTransaction(uuid);
                setTransactionDetails(res.data.data);
                setIsLoading(false);
            } catch {
                alert("Error fetching transaction details.");
            }
        };
        transaction().then();
    }, [uuid]);
    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent
                    variant="outline"
                    style={{ marginBottom: 16 }}
                    href="./"
                    label="← Back to Transactions"
                />
            </View>
            <TextComponent bold variant="h1" style={styles.title}>
                Transaction Details
            </TextComponent>
            {transactionDetails === null && isLoading ? (
                <LoadingComponent text="Loading transaction details..." />
            ) : (
                <View style={{ paddingBottom: 24, gap: 24 }}>
                    {/* Vehicle Owner Information */}
                    <CardComponent header="Vehicle Owner Information">
                        <View style={styles.infoGrid}>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Name</TextComponent>
                                <TextComponent style={styles.value}>
                                    {`${transactionDetails?.user_info.first_name} ${transactionDetails?.user_info.middle_name} ${transactionDetails?.user_info.last_name}`}
                                </TextComponent>
                            </View>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Contact Details</TextComponent>
                                <TextComponent style={styles.value}>
                                    {transactionDetails?.user_info.phone_number}
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {transactionDetails?.user_info.email}
                                </TextComponent>
                            </View>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Plate Number</TextComponent>
                                <TextComponent style={styles.value}>
                                    {transactionDetails?.user_info.plate_number}
                                </TextComponent>
                            </View>
                        </View>
                    </CardComponent>

                    {/* Slot Information */}
                    <CardComponent header="Slot Information">
                        <View style={styles.infoGrid}>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Slot Details</TextComponent>
                                <TextComponent style={styles.value}>
                                    Code: {transactionDetails?.slot_info.slot_code}
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    Floor Level: {transactionDetails?.slot_info.floor_level}
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    Type: {transactionDetails?.slot_info.vehicle_type_name} (
                                    {transactionDetails?.slot_info.vehicle_type_size})
                                </TextComponent>
                            </View>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Features</TextComponent>
                                <TextComponent style={styles.value}>
                                    {transactionDetails?.slot_info.slot_features}
                                    {transactionDetails?.slot_info.is_premium && " (Premium)"}
                                </TextComponent>
                            </View>
                        </View>
                    </CardComponent>

                    {/* Booking Details */}
                    <CardComponent header="Booking Details">
                        <View style={styles.infoGrid}>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Schedule</TextComponent>
                                <TextComponent style={styles.value}>
                                    Entry:{" "}
                                    {new Date(
                                        transactionDetails?.transaction.scheduled_entry_time ?? "",
                                    ).toLocaleString()}
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    Exit:{" "}
                                    {new Date(
                                        transactionDetails?.transaction.scheduled_exit_time ?? "",
                                    ).toLocaleString()}
                                </TextComponent>
                            </View>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Entry Time</TextComponent>
                                <TextComponent style={styles.value}>
                                    {transactionDetails?.transaction.entry_time}
                                </TextComponent>
                            </View>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Exit Time</TextComponent>
                                <TextComponent style={styles.value}>
                                    {transactionDetails?.transaction.exit_time &&
                                    transactionDetails.transaction.status === "completed"
                                        ? transactionDetails.transaction.exit_time
                                        : "N/A"}
                                </TextComponent>
                            </View>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Status</TextComponent>
                                <TextComponent style={[styles.value, styles.statusText]}>
                                    {transactionDetails?.transaction.status.toUpperCase()}
                                </TextComponent>
                            </View>
                        </View>
                    </CardComponent>

                    {/* Payment Information */}
                    <CardComponent header="Payment Information">
                        <View style={styles.infoGrid}>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Amount Due</TextComponent>
                                <TextComponent style={styles.value}>
                                    ₱{transactionDetails?.transaction.amount_due}
                                </TextComponent>
                            </View>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.label}>Payment Status</TextComponent>
                                <TextComponent style={[styles.value, styles.paymentStatus]}>
                                    {transactionDetails?.transaction.payment_status.toUpperCase()}
                                </TextComponent>
                            </View>
                        </View>
                    </CardComponent>
                </View>
            )}
        </ResponsiveContainer>
    );
};

export default TransactionDetails;

const styles = StyleSheet.create({
    title: {
        marginBottom: 24,
    },
    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 24,
        padding: 16,
    },
    infoBlock: {
        flex: 1,
        minWidth: 200,
    },
    label: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: "#111827",
        marginBottom: 8,
    },
    statusText: {
        color: "#059669",
        fontWeight: "600",
    },
    paymentStatus: {
        fontWeight: "600",
    },
});
