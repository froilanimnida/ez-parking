import React from "react";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import { BaseComponentProps } from "@/lib/types/ui";
import { baseStyles } from "@/styles/components";
import TextComponent from "./TextComponent";

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

export default ButtonComponent;
