import React, { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { paymentStatsReport } from "@lib/api/reports";
import PlatformType from "@lib/helper/platform";
import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonComponent from "@components/ButtonComponent";
import LoadingComponent from "@components/reusable/LoadingComponent";
import { View, StyleSheet } from "react-native";
import CardComponent from "@components/CardComponent";
import LinkComponent from "@components/LinkComponent";

const PaymentStatistics = () => {
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [paymentData, setPaymentData] = useState<
        {
            payment_status: string;
            total_amount: number;
            transaction_count: number;
        }[]
    >([]);

    const fetchPaymentStatistics = async () => {
        setLoading(true);
        try {
            const result = await paymentStatsReport(startDate, endDate);
            setPaymentData(result.data.data);
        } catch {
            alert("Error fetching payment statistics.");
        } finally {
            setLoading(false);
        }
    };
    const paidData = paymentData.filter((data) => data.payment_status === "paid");
    const unpaidData = paymentData.filter((data) => data.payment_status === "unpaid");

    useEffect(() => {
        fetchPaymentStatistics().then();
    }, []);

    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent
                    label="← Back to Reports"
                    style={{ width: "auto", marginBottom: 16 }}
                    href="/parking-manager/report"
                    variant={"outline"}
                />
            </View>
            <TextComponent bold variant="h1" style={styles.header}>
                Payment Statistics Report
            </TextComponent>
            <View style={styles.filterContainer}>
                {PlatformType() === "web" ? (
                    <>
                        <input
                            type="date"
                            onChange={(event) => setStartDate(new Date(event.target.value))}
                            style={{ marginRight: 8 }}
                        />
                        <input type="date" onChange={(event) => setEndDate(new Date(event.target.value))} />
                    </>
                ) : (
                    <>
                        <DateTimePicker value={startDate} onChange={(event, date) => setStartDate(date as Date)} />
                        <DateTimePicker value={endDate} onChange={(event, date) => setEndDate(date as Date)} />
                    </>
                )}
                <ButtonComponent onPress={fetchPaymentStatistics} style={{ marginLeft: 8 }} title={"Filter"} />
            </View>
            {loading ? (
                <LoadingComponent text="Fetching payment statistics..." />
            ) : (
                <View style={{ gap: 24 }}>
                    <CardComponent header={"Paid Transactions"}>
                        {paidData.map((data, index) => (
                            <View key={index} style={styles.dataRow}>
                                <TextComponent style={styles.dataLabel}>Total Amount:</TextComponent>
                                <TextComponent style={styles.dataValue}>
                                    PHP {data.total_amount.toLocaleString()}
                                </TextComponent>
                                <TextComponent style={styles.dataLabel}>Transaction Count:</TextComponent>
                                <TextComponent style={styles.dataValue}>{data.transaction_count}</TextComponent>
                            </View>
                        ))}
                    </CardComponent>

                    <CardComponent header={"Unpaid Transactions"}>
                        {unpaidData.map((data, index) => (
                            <View key={index} style={styles.dataRow}>
                                <TextComponent style={styles.dataLabel}>Total Amount:</TextComponent>
                                <TextComponent style={styles.dataValue}>
                                    PHP {data.total_amount.toLocaleString()}
                                </TextComponent>
                                <TextComponent style={styles.dataLabel}>Transaction Count:</TextComponent>
                                <TextComponent style={styles.dataValue}>{data.transaction_count}</TextComponent>
                            </View>
                        ))}
                    </CardComponent>
                </View>
            )}
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    dataRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    dataLabel: {
        fontWeight: "600",
        color: "#4b5563",
    },
    dataValue: {
        fontWeight: "600",
        color: "#1f2937",
    },
});

export default PaymentStatistics;
