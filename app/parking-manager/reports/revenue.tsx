import React, { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { revenueReport } from "@lib/api/reports";
import LinkComponent from "@components/LinkComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, StyleSheet } from "react-native";
import PlatformType from "@lib/helper/platform";
import ButtonComponent from "@components/ButtonComponent";
import LoadingComponent from "@components/reusable/LoadingComponent";
import CardComponent from "@components/CardComponent";

const Revenue = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState(true);
    const [revenueData, setRevenueData] = useState({
        average_transaction_value: 0,
        total_revenue: 0,
        total_transactions: 0,
    });

    const fetchRevenues = async () => {
        setLoading(true);
        try {
            const result = await revenueReport(startDate, endDate);
            setRevenueData(result.data.data);
        } catch {
            alert("Error fetching revenues.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenues().then();
    }, []);

    return (
        <ResponsiveContainer>
            <LinkComponent label="← Back to Reports" style={{ width: "auto", marginBottom: 16 }} href="./" />
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
                <ButtonComponent onPress={fetchRevenues} style={{ marginLeft: 8 }} title={"Filter"} />
            </View>
            {loading && <LoadingComponent text={"Loading revenue report..."} />}
            {!loading && (
                <CardComponent header={"Revenue Report"}>
                    <TextComponent variant="h2" style={styles.dataTitle}>
                        Revenue Report
                    </TextComponent>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Average Transaction Value:</TextComponent>
                        <TextComponent style={styles.dataValue}>
                            PHP {revenueData.average_transaction_value.toLocaleString()}
                        </TextComponent>
                    </View>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Total Revenue:</TextComponent>
                        <TextComponent style={styles.dataValue}>
                            PHP {revenueData.total_revenue.toLocaleString()}
                        </TextComponent>
                    </View>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Total Transactions:</TextComponent>
                        <TextComponent style={styles.dataValue}>{revenueData.total_transactions}</TextComponent>
                    </View>
                </CardComponent>
            )}
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    dataTitle: {
        marginBottom: 16,
        textAlign: "center",
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

export default Revenue;
