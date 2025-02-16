import React from "react";
import { View, StyleSheet } from "react-native";
import CheckboxComponent from "@/components/CheckboxComponent";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import TextInputComponent from "@/components/TextInputComponent";
import TimePicker from "@/app/parking-manager/settings/schedule";
import { DAYS_OF_WEEK } from "@lib/types/models/common/constants";

interface OperatingHours {
    enabled: boolean;
    open: string;
    close: string;
}

interface OperatingSchedule {
    [key: string]: OperatingHours;
}

interface Props {
    is24_7: boolean;
    operatingHours: OperatingSchedule;
    onIs24_7Change: (key: string, value: any) => void;
    onOperatingHoursChange: (day: string, field: keyof OperatingHours, value: string | boolean) => void;
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
                        {DAYS_OF_WEEK.map((day) => (
                            <View key={day} style={styles.dayContainer}>
                                <View style={styles.dayHeader}>
                                    <CheckboxComponent
                                        placeholder={formatDayName(day)}
                                        value={operatingHours[day].enabled}
                                        onValueChange={(value) => onOperatingHoursChange(day, "enabled", value)}
                                    />
                                </View>

                                <View style={styles.timeContainer}>
                                    <View style={styles.timeInputContainer}>
                                        <TextComponent style={styles.timeLabel}>Open</TextComponent>
                                        <TextInputComponent
                                            value={operatingHours[day].open}
                                            onChangeText={(value) => onOperatingHoursChange(day, "open", value)}
                                            editable={operatingHours[day].enabled}
                                        />
                                    </View>

                                    <View style={styles.timeInputContainer}>
                                        <TextComponent style={styles.timeLabel}>Close</TextComponent>
                                        <TextInputComponent
                                            value={operatingHours[day].close}
                                            onChangeText={(value) => onOperatingHoursChange(day, "close", value)}
                                            editable={operatingHours[day].enabled}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </>
                )}
            </View>
        </CardComponent>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    is24_7Container: {
        marginBottom: 16,
    },
    scheduleContainer: {
        maxHeight: 400,
    },
    dayContainer: {
        marginBottom: 16,
    },
    dayHeader: {
        marginBottom: 8,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 32,
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
