import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from "react-native";

type ButtonVariant = "primary" | "secondary" | "destructive";

interface ButtonComponentType {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: object;
    textStyle?: object;
    variant?: ButtonVariant;
    icon?: React.ReactNode;
}

const ButtonComponent = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
    textStyle,
    variant = "primary",
    icon,
}: ButtonComponentType) => {
    return (
        <TouchableOpacity
            style={[styles.button, styles[variant], disabled && styles.buttonDisabled, style]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={variant === "secondary" ? "#4F46E5" : "white"} />
            ) : (
                <React.Fragment>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text
                        style={[
                            styles.buttonText,
                            styles[`${variant}Text`],
                            disabled && styles.buttonTextDisabled,
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                </React.Fragment>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    primary: {
        backgroundColor: "#4F46E5",
    },
    secondary: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#4F46E5",
    },
    destructive: {
        backgroundColor: "#DC2626",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontWeight: "600",
    },
    primaryText: {
        color: "white",
    },
    secondaryText: {
        color: "#4F46E5",
    },
    destructiveText: {
        color: "white",
    },
    buttonTextDisabled: {
        color: "#9CA3AF",
    },
    iconContainer: {
        marginRight: 8,
    },
});

export default ButtonComponent;
