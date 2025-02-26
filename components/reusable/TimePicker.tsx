import React, { useState } from "react";
import PlatformType from "@lib/helper/platform";
import { View } from "react-native";
import ButtonComponent from "@components/ButtonComponent";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimePicker = ({
    value,
    onChange,
    label,
    disabled,
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

export default TimePicker;
