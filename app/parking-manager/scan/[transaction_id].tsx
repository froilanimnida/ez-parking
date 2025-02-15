import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import SelectComponent from "@/components/SelectComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { router, useLocalSearchParams } from "expo-router";
import { allowExit, allowTransaction, qrContentOverview } from "@/lib/api/parkingManager";
import type { ParkingSlot } from "@/lib/models/parking-slot";
import type { Transaction } from "@/lib/models/transaction";
import type { User } from "@/lib/models/user";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import type { AxiosError } from "axios";
import {calculateExceededTime, calculateTotalBill} from "@/lib/function/calculateGrandTotal";

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
        const fetchQrContent = async () => {
            try {
                const result = await qrContentOverview(transaction_id);
                setQrContent(result.data.data);
                setIsFetching(false);
            } catch (e: unknown) {
                const error = e as AxiosError<ApiErrorResponse>;
                alert(error.response?.data?.message || "Error fetching transaction details");
                router.replace("/parking-manager/scan");
            }
        };
        fetchQrContent();
    }, [transaction_id]);

    const handleUpdateStatus = async () => {
        setIsLoading(true);
        try {
            const result = await allowTransaction(transaction_id, paymentStatus);
            if (result.status === 200) {
                alert("Transaction status updated successfully");
            }
        } catch (e: unknown) {
            const err = e as AxiosError<ApiErrorResponse>;
            alert(err.response?.data?.message || "An error occurred while updating the transaction status");
        } finally {
            router.replace("/parking-manager/scan");
        }
    };

    const calculateAndAllowExit = async (
        transactionId: string,
        actualEntryTime: Date,
        rates: { hourly: number; daily: number; monthly: number },
        paymentStatus: "pending" | "paid"
    ) => {

        const calculation = calculateTotalBill(
            actualEntryTime,
            rates
        );
        alert("The user will be charged ₱" + calculation.totalAmount + " for the parking fee.");
        alert("Please make sure the user has paid before allowing exit.");
        try {
            const nowUTC = new Date();
            const nowPHT = new Date(nowUTC.getTime() + (8 * 60 * 60 * 1000));
            const result = await allowExit(
                transactionId,
                paymentStatus,
                nowPHT.toISOString(),
                calculation.totalAmount,
                qrContent?.parking_slot_info.slot_id!
            );
            if (result.status === 200) {
                alert("Exit allowed successfully.");
            } else {
                alert("Error allowing exit.");
            }
        } catch {
            alert("Error allowing exit.");
        }

    }

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
                            <TextComponent variant="body">{qrContent.transaction_data.uuid}</TextComponent>
                        </View>
                        <View style={styles.cardItem}>
                            <TextComponent variant="label">
                                Amount Due {" (This is estimated amount, actual amount may vary)"}
                            </TextComponent>
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
                            {qrContent.transaction_data.payment_status === "paid" && (
                                <TextComponent variant="body">
                                    This transaction has already been paid. No further action is required. Any overstay charges will be indicated in the box below.
                                </TextComponent>
                            )}
                            {qrContent.transaction_data.payment_status === "pending" && (
                                <>
                            <TextComponent style={styles.label}>Payment Status</TextComponent>
                            <SelectComponent
                                selectedValue={paymentStatus}
                                onValueChange={(itemValue) => setPaymentStatus(itemValue as "paid" | "pending")}
                                customStyles={styles.picker}
                                items={[
                                    { label: "Paid", value: "paid" },
                                    { label: "Pending", value: "pending" },
                                ]}
                            /></>
                            )}
                        </View>
                        <View style={styles.buttonRow}>
                            <ButtonComponent
                                onPress={() => {
                                    if (qrContent.transaction_data.status === "reserved") {
                                        handleUpdateStatus();
                                    } else if (qrContent.transaction_data.status === "active") {
                                        calculateAndAllowExit(
                                            transaction_id,
                                            new Date(qrContent.transaction_data.entry_time),
                                            {
                                                hourly: Number(qrContent.parking_slot_info.base_price_per_hour),
                                                daily: Number(qrContent.parking_slot_info.base_price_per_day),
                                                monthly: Number(qrContent.parking_slot_info.base_price_per_month)
                                            },
                                            paymentStatus
                                        );
                                    }
                                }}
                                disabled={isLoading}
                                title={
                                    isLoading
                                        ? "Updating..."
                                        : qrContent.transaction_data.status === "reserved"
                                        ? "Allow Entry"
                                        : "Allow Exit"
                                }
                            />
                        </View>
                    </CardComponent>
                    {qrContent.transaction_data.status === "active"  && (
                        <CardComponent header="Total Bill">
                            <View style={styles.cardItem}>
                                {(() => {
                                    // Calculate booking duration from scheduled times
                                    const scheduledEntry = new Date(qrContent.transaction_data.scheduled_entry_time);
                                    const scheduledExit = new Date(qrContent.transaction_data.scheduled_exit_time);
                                    const bookingDuration = Math.ceil((scheduledExit.getTime() - scheduledEntry.getTime()) / (1000 * 60 * 60));

                                    const bill = calculateTotalBill(
                                        new Date(qrContent.transaction_data.entry_time),
                                        {
                                            hourly: Number(qrContent.parking_slot_info.base_price_per_hour),
                                            daily: Number(qrContent.parking_slot_info.base_price_per_day),
                                            monthly: Number(qrContent.parking_slot_info.base_price_per_month)
                                        }
                                    );

                                    const exceededTime = calculateExceededTime(
                                        new Date(qrContent.transaction_data.entry_time),
                                        bookingDuration, // Using actual booking duration from scheduled times
                                        {
                                            hourly: Number(qrContent.parking_slot_info.base_price_per_hour),
                                            daily: Number(qrContent.parking_slot_info.base_price_per_day),
                                            monthly: Number(qrContent.parking_slot_info.base_price_per_month)
                                        }
                                    );

                                    return (
                                        <View>
                                            <TextComponent variant="label" style={{ marginBottom: 8 }}>Regular Charges</TextComponent>
                                            {bill.breakdown.months.count > 0 && (
                                                <TextComponent variant="body">
                                                    Months: {bill.breakdown.months.count} × ₱{bill.breakdown.months.rate} = ₱{bill.breakdown.months.total}
                                                </TextComponent>
                                            )}
                                            {bill.breakdown.days.count > 0 && (
                                                <TextComponent variant="body">
                                                    Days: {bill.breakdown.days.count} × ₱{bill.breakdown.days.rate} = ₱{bill.breakdown.days.total}
                                                </TextComponent>
                                            )}
                                            {bill.breakdown.hours.count > 0 && (
                                                <TextComponent variant="body">
                                                    Hours: {bill.breakdown.hours.count} × ₱{bill.breakdown.hours.rate} = ₱{bill.breakdown.hours.total}
                                                </TextComponent>
                                            )}

                                            {exceededTime.isOvertime && (
                                                <>
                                                    <TextComponent variant="label" style={{ marginTop: 16, marginBottom: 8, color: 'red' }}>
                                                        Overtime Charges
                                                    </TextComponent>
                                                    <TextComponent variant="body" style={{ color: 'red' }}>
                                                        Exceeded: {exceededTime.exceededDuration.hours}h {exceededTime.exceededDuration.minutes}m
                                                    </TextComponent>
                                                    <TextComponent variant="body" style={{ color: 'red' }}>
                                                        Rate: ₱{exceededTime.overtimeCharges.breakdown.hours.rate}/hour
                                                    </TextComponent>
                                                    <TextComponent variant="body" style={{ color: 'red' }}>
                                                        Overtime Fee: ₱{exceededTime.overtimeCharges.amount}
                                                    </TextComponent>
                                                </>
                                            )}

                                            <TextComponent variant="body" bold style={{ marginTop: 16, fontSize: 16 }}>
                                                Total Amount: ₱{bill.totalAmount + (exceededTime.isOvertime ? exceededTime.overtimeCharges.amount : 0)}
                                            </TextComponent>
                                        </View>
                                    );
                                })()}
                            </View>
                        </CardComponent>
                    )}
                {/*    If the parking is beyond the reserved time, calculate the total bill and display it here.*/}

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
