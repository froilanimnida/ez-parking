import React from "react";
import { TouchableOpacity, ActivityIndicator, View, StyleSheet } from "react-native";
import { BaseComponentProps } from "@/lib/types/ui";
import { baseStyles } from "@/styles/components";
import TextComponent from "./TextComponent";
import { useFonts } from "expo-font";

interface ButtonProps extends BaseComponentProps {
    onPress: () => void;
    title?: string;
}

const ButtonComponent = ({
    onPress,
    title,
    loading = false,
    disabled = false,
    style,
    textStyle,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    fullWidth = false,
    children,
}: ButtonProps) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });
    const content = children || (
        <>
            {icon && iconPosition === "left" && <View style={baseStyles.iconLeft}>{icon}</View>}
            {title && (
                <TextComponent
                    style={[
                        baseStyles[`text${size.toUpperCase()}`],
                        baseStyles[`${variant}Text`],
                        disabled && baseStyles.disabledText,
                        textStyle,
                        styles.text,
                    ]}
                >
                    {title}
                </TextComponent>
            )}
            {icon && iconPosition === "right" && <View style={baseStyles.iconRight}>{icon}</View>}
        </>
    );

    return (
        <TouchableOpacity
            style={[
                baseStyles.container,
                baseStyles[size],
                baseStyles[variant],
                fullWidth && baseStyles.fullWidth,
                disabled && baseStyles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? <ActivityIndicator color={variant === "primary" ? "white" : "#4F46E5"} /> : content}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "Inter",
    },
});

export default ButtonComponent;
