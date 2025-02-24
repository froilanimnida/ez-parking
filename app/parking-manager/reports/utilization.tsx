import React, { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { utilizationReport } from "@lib/api/reports";
import LinkComponent from "@components/LinkComponent";
import LoadingComponent from "@components/reusable/LoadingComponent";
import CardComponent from "@components/CardComponent";
import PlatformType from "@lib/helper/platform";
import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonComponent from "@components/ButtonComponent";
import { View, StyleSheet } from "react-native";

const Utilization = () => {
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [utilizationData, setUtilizationData] = useState<
        {
            total_duration_hours: string | number;
            transaction_count: number;
            vehicle_type_name: string;
        }[]
    >([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await utilizationReport(startDate, endDate);
            setUtilizationData(result.data.data);
        } catch {
            alert("Failed to fetch utilization report.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then();
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
                <ButtonComponent onPress={fetchData} style={{ marginLeft: 8 }} title={"Filter"} />
            </View>
            {loading ? (
                <LoadingComponent text="Fetching utilization report..." />
            ) : (
                utilizationData.map((data, index) => (
                    <CardComponent
                        key={index}
                        header={`${data.vehicle_type_name} Utilization`}
                        customStyles={{ marginBottom: 16 }}
                    >
                        <View style={styles.dataRow}>
                            <TextComponent style={styles.dataLabel}>Total Duration Hours:</TextComponent>
                            <TextComponent style={styles.dataValue}>{data.total_duration_hours}</TextComponent>
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

export default Utilization;
