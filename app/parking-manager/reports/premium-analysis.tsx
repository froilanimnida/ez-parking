import React, { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { premiumAnalysisReport } from "@lib/api/reports";
import LinkComponent from "@components/LinkComponent";
import LoadingComponent from "@components/reusable/LoadingComponent";
import PlatformType from "@lib/helper/platform";
import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonComponent from "@components/ButtonComponent";
import { View, StyleSheet } from "react-native";
import CardComponent from "@components/CardComponent";

const PremiumAnalysis = () => {
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [premiumData, setPremiumData] = useState<
        {
            average_revenue: number;
            slot_type: string;
            total_revenue: number;
            transaction_count: number;
        }[]
    >([]);

    const fetchPremiumAnalysis = async () => {
        setLoading(true);
        try {
            const result = await premiumAnalysisReport(startDate, endDate);
            setPremiumData(result.data.data);
        } catch {
            alert("Error fetching premium analysis report.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPremiumAnalysis().then();
    }, []);

    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1" style={styles.header}>
                Standard/Premium Analysis Report
            </TextComponent>
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
                <ButtonComponent onPress={fetchPremiumAnalysis} style={{ marginLeft: 8 }} title={"Filter"} />
            </View>
            {loading ? (
                <LoadingComponent text="Fetching premium analysis report..." />
            ) : (
                premiumData.map((data, index) => (
                    <CardComponent key={index} header={`${data.slot_type.toUpperCase()} Slot Analysis`}>
                        <View style={styles.dataRow}>
                            <TextComponent style={styles.dataLabel}>Average Revenue:</TextComponent>
                            <TextComponent style={styles.dataValue}>
                                PHP {data.average_revenue.toLocaleString()}
                            </TextComponent>
                        </View>
                        <View style={styles.dataRow}>
                            <TextComponent style={styles.dataLabel}>Total Revenue:</TextComponent>
                            <TextComponent style={styles.dataValue}>
                                PHP {data.total_revenue.toLocaleString()}
                            </TextComponent>
                        </View>
                        <View style={styles.dataRow}>
                            <TextComponent style={styles.dataLabel}>Transaction Count:</TextComponent>
                            <TextComponent style={styles.dataValue}>{data.transaction_count}</TextComponent>
                        </View>
                    </CardComponent>
                ))
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

export default PremiumAnalysis;
