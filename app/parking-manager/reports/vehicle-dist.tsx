import React, { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { vehicleDistributionReport } from "@lib/api/reports";
import LinkComponent from "@components/LinkComponent";
import LoadingComponent from "@components/reusable/LoadingComponent";
import CardComponent from "@components/CardComponent";
import PlatformType from "@lib/helper/platform";
import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonComponent from "@components/ButtonComponent";
import { View, StyleSheet } from "react-native";

const VehicleDistribution = () => {
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [vehicleData, setVehicleData] = useState<{ count: number; vehicle_type: string }[]>([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await vehicleDistributionReport(startDate, endDate);
            setVehicleData(result.data.data);
        } catch {
            alert("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then();
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
            {loading && <LoadingComponent text={"Fetching data..."} />}
            {!loading && (
                <CardComponent header={"Vehicle Distribution Report"}>
                    {vehicleData.map((data, index) => (
                        <View key={index} style={styles.dataRow}>
                            <TextComponent style={styles.dataLabel}>Vehicle Type:</TextComponent>
                            <TextComponent style={styles.dataValue}>{data.vehicle_type}</TextComponent>
                            <TextComponent style={styles.dataLabel}>Count:</TextComponent>
                            <TextComponent style={styles.dataValue}>{data.count}</TextComponent>
                        </View>
                    ))}
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

export default VehicleDistribution;
