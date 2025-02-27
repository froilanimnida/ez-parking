import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import { getEstablishmentSchedules, updateEstablishmentSchedules } from "@/lib/api/parkingManager";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import CheckboxComponent from "@/components/CheckboxComponent";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { OperatingHour } from "@lib/models/operatingHour";
import { DAYS_OF_WEEK, DaysOfWeek } from "@lib/types/models/common/constants";
import LinkComponent from "@components/LinkComponent";
import TimePicker from "@components/reusable/TimePicker";

interface ParkingSchedule {
    is_24_7: boolean;
    operating_hours: OperatingHour[];
}

export const DayScheduleRow = ({
    day,
    hours,
    onUpdate,
}: {
    day: DaysOfWeek;
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
                <TextComponent style={[styles.dayLabel, !hours.is_enabled && styles.disabledText]}>{day}</TextComponent>
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
        const getSchedules = async () => {
            try {
                const response = await getEstablishmentSchedules();
                const data = response.data.operating_hours;

                const initializedHours = DAYS_OF_WEEK.map((day) => {
                    const existingDay = data.operating_hours.find(
                        (h: { day_of_week: string }) => h.day_of_week === day,
                    );
                    return (
                        existingDay || {
                            day_of_week: day,
                            is_enabled: false,
                            opening_time: "09:00",
                            closing_time: "17:00",
                        }
                    );
                });

                setParkingData({
                    is_24_7: data.is_24_7,
                    operating_hours: initializedHours,
                });
            } catch (error) {
                console.error("Failed to fetch schedules:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getSchedules().then();
    }, []);

    const updateDaySchedule = (day: string, update: Partial<OperatingHour>) => {
        setParkingData((prev) => {
            if (!prev) return prev;

            const updatedHours = prev.operating_hours.map((hour) =>
                hour.day_of_week === day ? { ...hour, ...update } : hour,
            );

            setHasChanges(true);
            return {
                ...prev,
                operating_hours: updatedHours,
            };
        });
    };

    const updateSchedule = async () => {
        if (!parkingData || !hasChanges) return;

        try {
            setIsLoading(true);
            const result = await updateEstablishmentSchedules({
                operatingHours: parkingData.operating_hours.filter((h) => h.is_enabled),
                is24_7: parkingData.is_24_7,
            });
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
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent
                    label="← Back to Reports"
                    style={{ width: "auto", marginBottom: 16 }}
                    href="/parking-manager"
                    variant={"outline"}
                />
            </View>
            {isLoading ? (
                <LoadingComponent text="Loading..." />
            ) : (
                <>
                    <CardComponent
                        header="Operating Hours"
                        subHeader="Set your parking establishment's operating hours"
                    >
                        <View style={styles.header}>
                            <View style={styles.switchContainer}>
                                <CheckboxComponent
                                    value={parkingData?.is_24_7 || false}
                                    onValueChange={(value) =>
                                        setParkingData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    is_24_7: value,
                                                },
                                        )
                                    }
                                />
                                <TextComponent style={styles.switchLabel}>Open 24/7</TextComponent>
                            </View>
                        </View>
                        {parkingData?.is_24_7 != true ? (
                            <View style={styles.scheduleContainer}>
                                {DAYS_OF_WEEK.map((day: DaysOfWeek) => {
                                    const daySchedule = parkingData?.operating_hours.find(
                                        (hour) => hour.day_of_week === day,
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
                        <View style={{ marginTop: 20, alignSelf: "flex-end" }}>
                            <ButtonComponent onPress={updateSchedule} title="Save Changes" variant="primary" />
                        </View>
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
