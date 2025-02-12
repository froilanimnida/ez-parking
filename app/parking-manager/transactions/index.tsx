import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import TextComponent from "@/components/TextComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { getTransactions } from "@/lib/api/parkingManager";
import { type Transaction } from "@/lib/models/transaction";
import LoadingComponent from "@/components/reusable/LoadingComponent";

const TransactionItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.row} onPress={() => router.push(`/parking-manager/transactions/${item.uuid}`)}>
        <View style={styles.cell}>
            <TextComponent style={styles.cellText}>{item.slot_code}</TextComponent>
        </View>
        <View style={styles.cell}>
            <TextComponent style={styles.cellTextSecondary}>{new Date(item.entry_time).toLocaleString()}</TextComponent>
        </View>
        <View style={styles.cell}>
            <TextComponent style={styles.cellTextSecondary}>{new Date(item.exit_time).toLocaleString()}</TextComponent>
        </View>
        <View style={styles.cell}>
            <TextComponent style={styles.cellText}>₱{item.amount_due}</TextComponent>
        </View>
        <View style={styles.cell}>
            <TextComponent style={styles.cellTextSecondary}>{item.payment_status}</TextComponent>
        </View>
    </TouchableOpacity>
);

const Transactions = () => {
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await getTransactions();
                const flattenedTransactions = response.data.data
                    .flat()
                    .filter((transaction: Transaction) => transaction);
                setTransactions(flattenedTransactions);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTransaction();
    }, []);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1" style={styles.title}>
                Transactions
            </TextComponent>

            <View style={styles.tableHeader}>
                <View style={styles.headerCell}>
                    <TextComponent style={styles.headerText}>Slot</TextComponent>
                </View>
                <View style={styles.headerCell}>
                    <TextComponent style={styles.headerText}>Entry</TextComponent>
                </View>
                <View style={styles.headerCell}>
                    <TextComponent style={styles.headerText}>Exit</TextComponent>
                </View>
                <View style={styles.headerCell}>
                    <TextComponent style={styles.headerText}>Amount</TextComponent>
                </View>
                <View style={styles.headerCell}>
                    <TextComponent style={styles.headerText}>Status</TextComponent>
                </View>
            </View>
            {isLoading && transactions.length === 0 ? (
                <LoadingComponent text="Loading..." />
            ) : (
                transactions.map((transaction) => <TransactionItem item={transaction} key={transaction.uuid} />)
            )}
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 16,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    backText: {
        color: "#3B82F6",
        marginLeft: 8,
    },
    title: {
        marginBottom: 16,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#F3F4F6",
        padding: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
    },
    headerCell: {
        flex: 1,
        alignItems: "center",
    },
    headerText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6B7280",
        textTransform: "uppercase",
    },
    row: {
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "white",
    },
    cell: {
        flex: 1,
        alignItems: "center",
    },
    cellText: {
        fontSize: 14,
        color: "#111827",
    },
    cellTextSecondary: {
        fontSize: 14,
        color: "#6B7280",
    },
});

export default Transactions;
