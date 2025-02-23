import ResponsiveContainer from "@components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import React, { useEffect, useState } from "react";
import { occupancyReport } from "@lib/api/reports";
import LoadingComponent from "@components/reusable/LoadingComponent";
import { View, StyleSheet } from "react-native";
import LinkComponent from "@components/LinkComponent";

const Occupancy = () => {
    const [loading, setLoading] = useState(true);
    const [occupancyData, setOccupancyData] = useState({
        available_slots: 0,
        occupancy_rate: 0,
        occupied_slots: 0,
        total_slots: 0,
    });

    useEffect(() => {
        const fetchOccupancyReport = async () => {
            setLoading(true);
            try {
                const result = await occupancyReport();
                setOccupancyData(result.data.data);
            } catch {
                alert("Error fetching occupancy report");
            } finally {
                setLoading(false);
            }
        };
        fetchOccupancyReport().then();
    }, []);

    return (
        <ResponsiveContainer>
            <LinkComponent label="← Back to Reports" style={{ width: "auto", marginBottom: 16 }} href="./" />

            <TextComponent bold variant="h1" style={styles.header}>
                Occupancy Report
            </TextComponent>
            {loading ? (
                <LoadingComponent text="Fetching occupancy report..." />
            ) : (
                <View style={styles.dataContainer}>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Available Slots:</TextComponent>
                        <TextComponent style={styles.dataValue}>{occupancyData.available_slots}</TextComponent>
                    </View>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Occupancy Rate:</TextComponent>
                        <TextComponent style={styles.dataValue}>{occupancyData.occupancy_rate}%</TextComponent>
                    </View>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Occupied Slots:</TextComponent>
                        <TextComponent style={styles.dataValue}>{occupancyData.occupied_slots}</TextComponent>
                    </View>
                    <View style={styles.dataRow}>
                        <TextComponent style={styles.dataLabel}>Total Slots:</TextComponent>
                        <TextComponent style={styles.dataValue}>{occupancyData.total_slots}</TextComponent>
                    </View>
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
    dataContainer: {
        padding: 16,
        backgroundColor: "#f9fafb",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
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

export default Occupancy;
