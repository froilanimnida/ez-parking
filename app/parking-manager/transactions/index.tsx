import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Platform, StatusBar } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import TextComponent from "@/components/TextComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Transaction = {
    uuid: string;
    slot_code: string;
    entry_time: string;
    exit_time: string;
    amount_due: number;
    payment_status: string;
    status: string;
};

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
    const transactions: Transaction[] = [];

    return (
        <SafeAreaView style={styles.container}>
            <TextComponent variant="h1" style={styles.title}>
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

            <FlatList
                data={transactions}
                renderItem={({ item }) => <TransactionItem item={item} />}
                keyExtractor={(item) => item.uuid}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
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
