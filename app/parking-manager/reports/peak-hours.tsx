import React, { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { peakHoursReport } from "@lib/api/reports";
import LinkComponent from "@components/LinkComponent";
import LoadingComponent from "@components/reusable/LoadingComponent";
import { View, StyleSheet } from "react-native";
import CardComponent from "@components/CardComponent";

const PeakHours = () => {
    const [loading, setLoading] = useState(true);
    const [peakHoursData, setPeakHoursData] = useState<{ hour: string; transaction_count: number }[]>([]);

    useEffect(() => {
        const fetchPeakHours = async () => {
            setLoading(true);
            try {
                const result = await peakHoursReport();
                setPeakHoursData(result.data.data);
            } catch {
                alert("Error fetching peak hours report.");
            } finally {
                setLoading(false);
            }
        };
        fetchPeakHours().then();
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
                Peak Hours Report
            </TextComponent>
            {loading ? (
                <LoadingComponent text="Fetching peak hours report..." />
            ) : (
                <CardComponent header={"Peak Hours Report"}>
                    {peakHoursData.map((data, index) => (
                        <View key={index} style={styles.dataRow}>
                            <TextComponent style={styles.dataLabel}>Hour:</TextComponent>
                            <TextComponent style={styles.dataValue}>{data.hour}</TextComponent>
                            <TextComponent style={styles.dataLabel}>Transaction Count:</TextComponent>
                            <TextComponent style={styles.dataValue}>{data.transaction_count}</TextComponent>
                        </View>
                    ))}
                </CardComponent>
            )}
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 24,
        paddingHorizontal: 16,
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

export default PeakHours;
