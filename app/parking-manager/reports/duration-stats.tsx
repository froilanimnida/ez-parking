import React, { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { durationStatsReport } from "@lib/api/reports";
import LinkComponent from "@components/LinkComponent";
import LoadingComponent from "@components/reusable/LoadingComponent";
import CardComponent from "@components/CardComponent";
import PlatformType from "@lib/helper/platform";
import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonComponent from "@components/ButtonComponent";
import { View, StyleSheet } from "react-native";

const DurationStatistics = () => {
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [durationData, setDurationData] = useState<{
        average_duration_hours: string;
        max_duration_hours: string;
        min_duration_hours: string;
        total_transactions: number;
    }>({
        average_duration_hours: "",
        max_duration_hours: "",
        min_duration_hours: "",
        total_transactions: 0,
    });

    const fetchDurationStatistics = async () => {
        setLoading(true);
        try {
            const result = await durationStatsReport(startDate, endDate);
            setDurationData(result.data.data);
        } catch {
            alert("Error fetching duration statistics.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDurationStatistics().then();
    }, []);

    return (
        <ResponsiveContainer>
            <LinkComponent label="← Back to Reports" style={{ width: "auto", marginBottom: 16 }} href="./" />
            <TextComponent bold variant="h1">
                Duration Statistics
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
                <ButtonComponent onPress={fetchDurationStatistics} style={{ marginLeft: 8 }} title={"Filter"} />
            </View>
            {loading ? (
                <LoadingComponent text="Fetching duration statistics..." />
            ) : (
                <CardComponent header="Duration Statistics">
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Average Duration Hours:</TextComponent>
                        <TextComponent style={styles.dataValue}>{durationData.average_duration_hours}</TextComponent>
                    </View>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Max Duration Hours:</TextComponent>
                        <TextComponent style={styles.dataValue}>{durationData.max_duration_hours}</TextComponent>
                    </View>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Min Duration Hours:</TextComponent>
                        <TextComponent style={styles.dataValue}>{durationData.min_duration_hours}</TextComponent>
                    </View>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Total Transactions:</TextComponent>
                        <TextComponent style={styles.dataValue}>{durationData.total_transactions}</TextComponent>
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

export default DurationStatistics;
