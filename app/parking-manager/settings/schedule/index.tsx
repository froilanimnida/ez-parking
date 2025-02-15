import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import { getEstablishmentSchedules, updateEstablishmentSchedules } from "@/lib/api/parkingManager";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import CheckboxComponent from "@/components/CheckboxComponent";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import ButtonComponent from "@/components/ButtonComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import PlatformType from "@lib/helper/platform";
import { OperatingHour } from "@lib/models/operating-hour";
import {DAYS_OF_WEEK} from "@lib/types/models/common/constants";
import LinkComponent from "@components/LinkComponent";

interface ParkingSchedule {
    is_24_7: boolean;
    operating_hours: OperatingHour[];
}

const TimePicker = ({
                        value,
                        onChange,
                        label,
                        disabled
                    }: {
    value: string;
    onChange: (time: string) => void;
    label: string;
    disabled?: boolean;
}) => {
    const [show, setShow] = useState(false);

    if (PlatformType() === "web") {
        return (
            <input
                type="time"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                style={{
                    padding: 8,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: disabled ? "#e5e7eb" : "#d1d5db",
                    opacity: disabled ? 0.5 : 1,
                }}
            />
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ButtonComponent
                onPress={() => setShow(true)}
                title={`${label}: ${value}`}
                variant="secondary"
                size="sm"
                disabled={disabled}
            />
            {show && !disabled && (
                <DateTimePicker
                    value={new Date(`2000-01-01T${value}`)}
                    mode="time"
                    is24Hour={true}
                    onChange={(event, selectedTime) => {
                        setShow(false);
                        if (event.type === "set" && selectedTime) {
                            const timeString = selectedTime.toLocaleTimeString("en-US", {
                                hour12: false,
                                hour: "2-digit",
                                minute: "2-digit",
                            });
                            onChange(timeString);
                        }
                    }}
                />
            )}
        </View>
    );
};

const DayScheduleRow = ({
                            day,
                            hours,
                            onUpdate,
                        }: {
    day: string;
    hours: OperatingHour;
    onUpdate: (update: Partial<OperatingHour>) => void;
}) => {
    return (
        <View style={styles.dayRow}>
            <View style={styles.dayToggle}>
                <CheckboxComponent
                    value={hours.is_enabled}
                    onValueChange={(value) => onUpdate({ is_enabled: value })}
                />
                <TextComponent style={[
                    styles.dayLabel,
                    !hours.is_enabled && styles.disabledText
                ]}>
                    {day}
                </TextComponent>
            </View>

            {hours.is_enabled && (
                <View style={styles.timeInputs}>
                    <TimePicker
                        label="Open"
                        value={hours.opening_time}
                        onChange={(time) => onUpdate({ opening_time: time })}
                        disabled={!hours.is_enabled}
                    />
                    <TimePicker
                        label="Close"
                        value={hours.closing_time}
                        onChange={(time) => onUpdate({ closing_time: time })}
                        disabled={!hours.is_enabled}
                    />
                </View>
            )}
        </View>
    );
};

const ParkingEstablishmentSchedule = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [parkingData, setParkingData] = useState<ParkingSchedule | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    useEffect(() => {
        console.log("Updated");
    }, [parkingData]);

    useEffect(() => {
        const getSchedules = async () => {
            try {
                const response = await getEstablishmentSchedules();
                const data = response.data.operating_hours;

                const initializedHours = DAYS_OF_WEEK.map(day => {
                    const existingDay = data.operating_hours.find((h: { day_of_week: string; }) => h.day_of_week === day);
                    return existingDay || {
                        day_of_week: day,
                        is_enabled: false,
                        opening_time: "09:00",
                        closing_time: "17:00",
                    };
                });

                setParkingData({
                    is_24_7: data.is_24_7,
                    operating_hours: initializedHours
                });
            } catch (error) {
                console.error("Failed to fetch schedules:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getSchedules();
    }, []);

    const updateDaySchedule = (day: string, update: Partial<OperatingHour>) => {
        setParkingData(prev => {
            if (!prev) return prev;

            const updatedHours = prev.operating_hours.map(hour =>
                hour.day_of_week === day ? { ...hour, ...update } : hour
            );

            setHasChanges(true);
            return {
                ...prev,
                operating_hours: updatedHours
            };
        });
    };

    const updateSchedule = async () => {
        if (!parkingData || !hasChanges) return;

        try {
            setIsLoading(true);
            const result = await updateEstablishmentSchedules({
                operatingHours: parkingData.operating_hours.filter(h => h.is_enabled),
                is24_7: parkingData.is_24_7,
            });
            console.log(result)

            if (result.status === 200) {
                setHasChanges(false);
                alert("Schedules updated successfully.");
            }
        } catch (error) {
            console.error("Failed to update schedules:", error);
            alert("Failed to update schedules.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ResponsiveContainer>
            {isLoading ? (
                <LoadingComponent text="Loading..." />
            ) : (
    <>
        <LinkComponent label="← Back to Dashboard" style={{ width: "auto", marginBottom: 16 }} href="../" />

                <CardComponent header="Operating Hours" subHeader="Set your parking establishment's operating hours">
                    <View style={styles.header}>
                        <View style={styles.switchContainer}>
                            <CheckboxComponent
                                value={parkingData?.is_24_7 || false}
                                onValueChange={(value) =>
                                    setParkingData((prev) =>
                                        prev && {
                                            ...prev,
                                            is_24_7: value,
                                        }
                                    )
                                }
                            />
                            <TextComponent style={styles.switchLabel}>Open 24/7</TextComponent>
                        </View>
                        <ButtonComponent
                            onPress={updateSchedule}
                            title="Save Changes"
                            variant="primary"
                        />
                    </View>
                    {parkingData?.is_24_7 != true ? (

                    <View style={styles.scheduleContainer}>
                        {DAYS_OF_WEEK.map((day) => {
                            const daySchedule = parkingData?.operating_hours.find(
                                (hour) => hour.day_of_week === day
                            ) ?? {
                                day_of_week: day,
                                is_enabled: false,
                                opening_time: "09:00",
                                closing_time: "17:00",
                            };

                            return (
                                <DayScheduleRow
                                    key={day}
                                    day={day}
                                    hours={daySchedule}
                                    onUpdate={(update) => updateDaySchedule(day, update)}
                                />
                            );
                        })}
                    </View>
                    ) : (
                        <TextComponent>Open 24/7</TextComponent>
                    )}
                </CardComponent>
    </>
            )}
        </ResponsiveContainer>
    );
};
export default ParkingEstablishmentSchedule;

const styles = StyleSheet.create({
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
    disabledText: {
        color: "#9ca3af",
    },
});
