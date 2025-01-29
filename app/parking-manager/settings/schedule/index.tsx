import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import { defaultBodyStyles, defaultContainerStyles } from "@/styles/default";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";

interface OperatingHours {
    enabled: boolean;
    open: string;
    close: string;
}

interface ParkingSchedule {
    parkingDetails: {
        is247: boolean;
        operatingHours: {
            [key: string]: OperatingHours;
        };
    };
}

interface ScheduleValidationError {
    day?: string;
    message: string;
}

const ParkingEstablishmentSchedule = () => {
    const [scheduleErrors, setScheduleErrors] = useState<ScheduleValidationError[]>([]);
    const [parkingData, setParkingData] = useState<ParkingSchedule>({
        parkingDetails: {
            is247: false,
            operatingHours: {
                monday: { enabled: false, open: "", close: "" },
                tuesday: { enabled: false, open: "", close: "" },
                wednesday: { enabled: false, open: "", close: "" },
                thursday: { enabled: false, open: "", close: "" },
                friday: { enabled: false, open: "", close: "" },
                saturday: { enabled: false, open: "", close: "" },
                sunday: { enabled: false, open: "", close: "" },
            },
        },
    });
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.body}>
                <ScrollView style={styles.body}>
                    <CardComponent
                        header="Operating Hours"
                        subHeader="Set your parking establishment's operating hours"
                    >
                        <View style={styles.header}>
                            <View style={styles.switchContainer}>
                                <Switch
                                    value={parkingData.parkingDetails.is247}
                                    onValueChange={(value) =>
                                        setParkingData((prev) => ({
                                            ...prev,
                                            parkingDetails: {
                                                ...prev.parkingDetails,
                                                is247: value,
                                            },
                                        }))
                                    }
                                />
                                <TextComponent style={styles.switchLabel}>Open 24/7</TextComponent>
                            </View>
                        </View>

                        {!parkingData.parkingDetails.is247 && (
                            <View style={styles.scheduleContainer}>
                                {Object.entries(parkingData.parkingDetails.operatingHours).map(([day, hours]) => (
                                    <View key={day} style={styles.dayRow}>
                                        <View style={styles.dayToggle}>
                                            <Switch
                                                value={hours.enabled}
                                                onValueChange={(value) => {
                                                    setParkingData((prev) => ({
                                                        ...prev,
                                                        parkingDetails: {
                                                            ...prev.parkingDetails,
                                                            operatingHours: {
                                                                ...prev.parkingDetails.operatingHours,
                                                                [day]: {
                                                                    ...hours,
                                                                    enabled: value,
                                                                },
                                                            },
                                                        },
                                                    }));
                                                }}
                                            />
                                            <TextComponent style={styles.dayLabel}>
                                                {day.charAt(0).toUpperCase() + day.slice(1)}
                                            </TextComponent>
                                        </View>

                                        <View style={styles.timeInputs}>{/* Time picker implementation */}</View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </CardComponent>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default ParkingEstablishmentSchedule;

const styles = StyleSheet.create({
    container: {
        ...defaultContainerStyles,
    },
    body: {
        ...defaultBodyStyles,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    switchLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: "#374151",
    },
    scheduleContainer: {
        gap: 16,
    },
    dayRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    dayToggle: {
        width: 120,
        flexDirection: "row",
        alignItems: "center",
    },
    dayLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: "#374151",
    },
    timeInputs: {
        flex: 1,
        flexDirection: "row",
        gap: 16,
    },
});
