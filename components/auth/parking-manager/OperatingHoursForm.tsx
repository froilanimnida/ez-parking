import React from "react";
import { View, StyleSheet } from "react-native";
import CheckboxComponent from "@/components/CheckboxComponent";
import CardComponent from "@/components/CardComponent";
import { DAYS_OF_WEEK } from "@lib/types/models/common/constants";
import { OperatingSchedule } from "@lib/models/operatingHour";
import TimePicker from "@components/reusable/TimePicker";

interface OperatingHours {
    enabled: boolean;
    open: string;
    close: string;
}

interface Props {
    is24_7: boolean;
    operatingHours: OperatingSchedule;
    onIs24_7Change: (key: string, value: any) => void;
    onOperatingHoursChange: (
        day: keyof OperatingSchedule,
        field: keyof OperatingHours,
        value: string | boolean,
    ) => void;
    onParkingDataChange: (key: string, value: any) => void;
}

const OperatingHoursForm: React.FC<Props> = ({
    is24_7,
    operatingHours,
    onIs24_7Change,
    onOperatingHoursChange,
    onParkingDataChange,
}) => {
    const formatDayName = (day: string) => {
        return day.charAt(0).toUpperCase() + day.slice(1);
    };

    return (
        <CardComponent header="Operating Hours" subHeader="Set your business hours" customStyles={{ width: "95%" }}>
            <View style={styles.container}>
                <View style={styles.is24_7Container}>
                    <CheckboxComponent
                        placeholder="Open 24/7"
                        value={is24_7}
                        onValueChange={() => {
                            onParkingDataChange("is24_7", !is24_7);
                            onIs24_7Change("operating_hours", { ...operatingHours, enabled: true });
                        }}
                    />
                </View>

                {!is24_7 && (
                    <>
                        {DAYS_OF_WEEK.map((day) => {
                            const dayKey = day.toLowerCase() as keyof OperatingSchedule;
                            return (
                                <View key={day} style={styles.dayContainer}>
                                    <View style={styles.dayHeader}>
                                        <CheckboxComponent
                                            placeholder={day}
                                            value={operatingHours[dayKey].enabled}
                                            onValueChange={(value) => onOperatingHoursChange(dayKey, "enabled", value)}
                                        />
                                    </View>

                                    <View style={styles.timeContainer}>
                                        <TimePicker
                                            value={
                                                operatingHours[dayKey].enabled ? operatingHours[dayKey].open : "00:00"
                                            }
                                            onChange={(value) => onOperatingHoursChange(dayKey, "open", value)}
                                            label={"Open"}
                                            disabled={!operatingHours[dayKey].enabled}
                                        />
                                        <TimePicker
                                            value={
                                                operatingHours[dayKey].enabled ? operatingHours[dayKey].close : "00:00"
                                            }
                                            onChange={(value) => onOperatingHoursChange(dayKey, "close", value)}
                                            label={"Close"}
                                            disabled={!operatingHours[dayKey].enabled}
                                        />
                                    </View>
                                </View>
                            );
                        })}
                    </>
                )}
            </View>
        </CardComponent>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 8,
    },
    is24_7Container: {
        marginBottom: 16,
    },
    scheduleContainer: {
        maxHeight: 400,
    },
    dayContainer: {
        marginBottom: 16,
        gap: 8,
    },
    dayHeader: {
        marginBottom: 8,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
    },
    timeInputContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    timeLabel: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 4,
    },
    timeInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 6,
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
    },
    disabledInput: {
        backgroundColor: "#F3F4F6",
    },
});

export default OperatingHoursForm;
