import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { responsiveContainer } from "@/styles/default";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import { ParkingSlot } from "@/lib/models/parking-slot";
import { Transaction } from "@/lib/models/transaction";
import TextInputComponent from "@/components/TextInputComponent";
import LinkComponent from "@/components/LinkComponent";
import {
    SafeAreaView,
} from "react-native-safe-area-context";

const getPaymentStatusStyle = (status: string) => {
    switch (status) {
        case "PAID":
            return { backgroundColor: "#DEF7EC", color: "#03543F" };
        case "PARTIALLY_PAID":
            return { backgroundColor: "#FEF3C7", color: "#92400E" };
        case "OVERDUE":
            return { backgroundColor: "#FEE2E2", color: "#991B1B" };
        default:
            return { backgroundColor: "#F3F4F6", color: "#1F2937" };
    }
};

const getTransactionStatusStyle = (status: string) => {
    switch (status) {
        case "active":
            return { backgroundColor: "#DBEAFE", color: "#1E40AF" };
        case "completed":
            return { backgroundColor: "#DEF7EC", color: "#03543F" };
        case "cancelled":
            return { backgroundColor: "#FEE2E2", color: "#991B1B" };
        default:
            return { backgroundColor: "#FEF3C7", color: "#92400E" };
    }
};

interface APIResponse extends Transaction, ParkingSlot {}

const Transactions = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [transactions, setTransactions] = useState<APIResponse[]>([]);

    const mockTransactions: APIResponse[] = [
        {
            amount_due: "100.00",
            base_rate: 50,
            created_at: "2021-10-01T00:00:00Z",
            duration_type: "hourly",
            entry_time: "2021-10-01T00:00:00Z",
            establishment_id: 1,
            exit_time: "2021-10-01T01:00:00Z",
            floor_level: 1,
            is_active: true,
            is_premium: false,
            payment_status: "PAID",
            slot_code: "A1",
            slot_features: "standard",
            slot_id: 1,
            slot_status: "open",
            slot_multiplier: 1,
            status: "completed",
            transaction_id: 1,
            updated_at: "2021-10-01T01:00:00Z",
            user_id: 1,
            uuid: "12345678-1234-1234-1234-1234567890AB",
            vehicle_type_id: 1,
        },
        {
            amount_due: "200.00",
            base_rate: 100,
            created_at: "2021-10-01T00:00:00Z",
            duration_type: "hourly",
            entry_time: "2021-10-01T00:00:00Z",
            establishment_id: 1,
            exit_time: "2021-10-01T02:00:00Z",
            floor_level: 1,
            is_active: true,
            is_premium: true,
            payment_status: "PAID",
            slot_code: "B1",
            slot_features: "premium",
            slot_id: 2,
            status: "completed",
            transaction_id: 2,
            updated_at: "2021-10-01T02:00:00Z",
            user_id: 1,
            uuid: "12345678-1234-1234-1234-1234567890AC",
            vehicle_type_id: 1,
            slot_status: "open",
            slot_multiplier: 0,
        },
    ];

    return (
        <SafeAreaView style={[responsiveContainer]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 24, flexDirection: "column", display: "flex" }}>
                <LinkComponent style={styles.backLink} href="../user">
                    ← Back to Dashboard
                </LinkComponent>
                <View style={styles.titleContainer}>
                    <View>
                        <TextComponent bold style={styles.title}>
                            My Transactions
                        </TextComponent>
                        <TextComponent style={styles.subtitle}>View and manage your parking transactions</TextComponent>
                    </View>

                    <TextInputComponent
                        customStyles={styles.searchInput}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        placeholder="Search by slot code or vehicle type..."
                    />
                </View>

                <View style={styles.transactionList}>
                    {mockTransactions.map((transaction) => (
                        <CardComponent key={transaction.uuid} customStyles={styles.card} header="Transaction Details">
                            <View style={styles.cardHeader}>
                                <LinkComponent
                                    href={`./transactions/${transaction.uuid}`}
                                    style={{ backgroundColor: "transparent" }}
                                >
                                    <TextComponent style={styles.transactionId}>
                                        Transaction ID: {transaction.uuid}
                                    </TextComponent>
                                </LinkComponent>

                                <View style={styles.statusContainer}>
                                    {transaction.status !== "failed" && (
                                        <TextComponent
                                            style={[
                                                styles.statusBadge,
                                                getPaymentStatusStyle(transaction.payment_status),
                                            ]}
                                        >
                                            {transaction.payment_status}
                                        </TextComponent>
                                    )}
                                    <TextComponent
                                        style={[styles.statusBadge, getTransactionStatusStyle(transaction.status)]}
                                    >
                                        {transaction.status}
                                    </TextComponent>
                                </View>
                            </View>
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailsSection}>
                                    <TextComponent style={styles.sectionTitle}>Slot Information</TextComponent>
                                    <View style={styles.detailRow}>
                                        <TextComponent style={styles.detailLabel}>Code:</TextComponent>
                                        <TextComponent style={styles.detailValue}>
                                            {transaction.slot_code}
                                        </TextComponent>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <TextComponent style={styles.detailLabel}>Floor:</TextComponent>
                                        <TextComponent style={styles.detailValue}>
                                            Level {transaction.floor_level}
                                        </TextComponent>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <TextComponent style={styles.detailLabel}>Features:</TextComponent>
                                        <View style={styles.featureContainer}>
                                            <TextComponent style={styles.detailValue}>
                                                {transaction.slot_features.toUpperCase()}
                                            </TextComponent>
                                            {transaction.is_premium && (
                                                <View style={styles.premiumBadge}>
                                                    <TextComponent style={styles.premiumText}>Premium</TextComponent>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.detailsSection, styles.middleSection]}>
                                    <TextComponent style={styles.sectionTitle}>Rate Information</TextComponent>
                                    <View style={styles.detailRow}>
                                        <TextComponent style={styles.detailLabel}>Slot Multiplier:</TextComponent>
                                        <TextComponent style={styles.detailValue}>
                                            {transaction.slot_multiplier}x
                                        </TextComponent>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <TextComponent style={styles.detailLabel}>Base Rate:</TextComponent>
                                        <TextComponent style={styles.detailValue}>
                                            {transaction.base_rate}x
                                        </TextComponent>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <TextComponent style={styles.detailLabel}>Amount Due:</TextComponent>
                                        <TextComponent style={styles.detailValue}>
                                            ₱{transaction.amount_due}
                                        </TextComponent>
                                    </View>
                                </View>

                                <View style={styles.detailsSection}>
                                    <TextComponent style={styles.sectionTitle}>Other Information</TextComponent>
                                    <View style={styles.detailRow}>
                                        <TextComponent style={styles.detailLabel}>Amount Due Type:</TextComponent>
                                        <TextComponent style={styles.detailValue}>
                                            {transaction.duration_type.toUpperCase()}
                                        </TextComponent>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <TextComponent style={styles.detailLabel}>Entry Time:</TextComponent>
                                        <TextComponent style={styles.detailValue}>
                                            {transaction.entry_time ?? "N/A"}
                                        </TextComponent>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <TextComponent style={styles.detailLabel}>Exit Time:</TextComponent>
                                        <TextComponent style={styles.detailValue}>
                                            {transaction.exit_time ?? "N/A"}
                                        </TextComponent>
                                    </View>
                                </View>
                            </View>
                        </CardComponent>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Transactions;

const styles = StyleSheet.create({
    header: {
        marginBottom: 24,
    },
    backLink: {
        margin: 16,
        alignSelf: "flex-start",
        fontWeight: "600",
    },
    titleContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        color: "#111827",
    },
    subtitle: {
        marginTop: 8,
        fontSize: 14,
        color: "#6b7280",
    },
    searchInput: {
        marginTop: 12,
        padding: 12,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    transactionList: {
        width: "100%",
    },
    card: {
        padding: 16,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    idContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        backgroundColor: "#EEF2FF",
        padding: 8,
        borderRadius: 8,
        marginRight: 12,
    },
    transactionId: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
    uuid: {
        fontSize: 14,
        color: "#6b7280",
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    detailsGrid: {
        flexDirection: "column",
        gap: 24,
    },
    detailsSection: {
        flex: 1,
        gap: 8,
    },
    middleSection: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#E5E7EB",
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#6B7280",
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    detailLabel: {
        fontSize: 14,
        color: "#6B7280",
    },
    detailValue: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111827",
    },
    featureContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    premiumBadge: {
        backgroundColor: "#F3E8FF",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    premiumText: {
        fontSize: 12,
        color: "#6B21A8",
        fontWeight: "500",
    },
});
