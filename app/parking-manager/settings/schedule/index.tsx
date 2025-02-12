import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultBodyStyles, defaultContainerStyles } from "@/styles/default";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import { getEstablishmentSchedules, updateEstablishmentSchedules } from "@/lib/api/parkingManager";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import CheckboxComponent from "@/components/CheckboxComponent";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import ButtonComponent from "@/components/ButtonComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import PlatformType from "@/lib/platform";

interface OperatingHours {
    enabled: boolean;
    open: string;
    close: string;
}

interface ParkingSchedule {
    is_24_7: boolean;

    operating_hours: {
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

const TimePicker = ({ value, onChange, label }: { value: string; onChange: (time: string) => void; label: string }) => {
    const [show, setShow] = useState(false);

    if (PlatformType() === "web") {
        return (
            <input
                type="time"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: 8,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                }}
            />
        );
    }

    const showTimePicker = () => setShow(true);

    return (
        <View style={{ flex: 1 }}>
            <ButtonComponent onPress={showTimePicker} title={`${label}: ${value}`} variant="secondary" size="sm" />
            {show && (
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

// Schedule row component
const DayScheduleRow = ({
    day,
    hours,
    onUpdate,
}: {
    day: string;
    hours: OperatingHours;
    onUpdate: (update: Partial<OperatingHours>) => void;
}) => {
    return (
        <View style={styles.dayRow}>
            <View style={styles.dayToggle}>
                <CheckboxComponent value={hours.enabled} onValueChange={(value) => onUpdate({ enabled: value })} />
                <TextComponent style={styles.dayLabel}>{day.charAt(0).toUpperCase() + day.slice(1)}</TextComponent>
            </View>

            <View style={styles.timeInputs}>
                <TimePicker label="Open" value={hours.open} onChange={(time) => onUpdate({ open: time })} />
                <TimePicker label="Close" value={hours.close} onChange={(time) => onUpdate({ close: time })} />
            </View>
        </View>
    );
};

const ParkingEstablishmentSchedule = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [parkingData, setParkingData] = useState<ParkingSchedule | null>(null);

    useEffect(() => {
        const getSchedules = async () => {
            try {
                const response = await getEstablishmentSchedules();
                setParkingData(response.data.operating_hours);
            } catch (error) {
                console.error("Failed to fetch schedules:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getSchedules();
    }, []);

    const updateDaySchedule = (day: string, update: Partial<OperatingHours>) => {
        setParkingData(
            (prev) =>
                prev && {
                    ...prev,
                    operating_hours: {
                        ...prev.operating_hours,
                        operatingHours: {
                            ...prev.operating_hours.operatingHours,
                            [day]: {
                                ...prev.operating_hours.operatingHours[day],
                                ...update,
                            },
                        },
                    },
                }
        );
    };

    if (isLoading) {
        return <LoadingComponent text="Loading schedules..." />;
    }

    if (!parkingData) {
        return <TextComponent>No schedule data available</TextComponent>;
    }

    return (
        <ResponsiveContainer>
            <CardComponent header="Operating Hours" subHeader="Set your parking establishment's operating hours">
                <View style={styles.header}>
                    <View style={styles.switchContainer}>
                        <CheckboxComponent
                            value={parkingData.operating_hours.is247}
                            onValueChange={(value) =>
                                setParkingData(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            operating_hours: {
                                                ...prev.operating_hours,
                                                is247: value,
                                            },
                                        }
                                )
                            }
                        />
                        <TextComponent style={styles.switchLabel}>Open 24/7</TextComponent>
                    </View>
                </View>

                {!parkingData.operating_hours.is247 && (
                    <View style={styles.scheduleContainer}>
                        {Object.entries(parkingData.operating_hours.operatingHours).map(([day, hours]) => (
                            <DayScheduleRow
                                key={day}
                                day={day}
                                hours={hours}
                                onUpdate={(update) => updateDaySchedule(day, update)}
                            />
                        ))}
                    </View>
                )}
            </CardComponent>
        </ResponsiveContainer>
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
