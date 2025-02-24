import React, { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { trendAnalysisReport } from "@lib/api/reports";
import LoadingComponent from "@components/reusable/LoadingComponent";
import CardComponent from "@components/CardComponent";
import { View, StyleSheet } from "react-native";
import LinkComponent from "@components/LinkComponent";

const Trends = () => {
    const [loading, setLoading] = useState(true);
    const [trendData, setTrendData] = useState<
        {
            daily_revenue: number;
            daily_transactions: number;
            date: string;
        }[]
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await trendAnalysisReport();
                setTrendData(result.data.data);
            } catch {
                alert("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData().then();
    }, []);

    return (
        <ResponsiveContainer>
            <LinkComponent label="← Back to Reports" style={{ width: "auto", marginBottom: 16 }} href="./" />

            <TextComponent bold variant="h1" style={styles.header}>
                Trends
            </TextComponent>
            {loading ? (
                <LoadingComponent text="Fetching trend data..." />
            ) : (
                trendData.map((data, index) => (
                    <CardComponent key={index} header={`Date: ${data.date}`} customStyles={{ marginBottom: 16 }}>
                        <View style={styles.dataRow}>
                            <TextComponent style={styles.dataLabel}>Daily Revenue:</TextComponent>
                            <TextComponent style={styles.dataValue}>
                                PHP {data.daily_revenue.toLocaleString()}
                            </TextComponent>
                        </View>
                        <View style={styles.dataRow}>
                            <TextComponent style={styles.dataLabel}>Daily Transactions:</TextComponent>
                            <TextComponent style={styles.dataValue}>{data.daily_transactions}</TextComponent>
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

export default Trends;
