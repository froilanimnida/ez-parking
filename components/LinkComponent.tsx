import { StyleSheet, Pressable } from "react-native";
import { Link, type ExternalPathString, type RelativePathString } from "expo-router";
import TextComponent from "@/components/TextComponent";
import React from "react";
import { useFonts } from "expo-font";

type LinkVariant = "primary" | "secondary" | "text" | "destructive";

interface LinkComponentProps {
    asButton?: boolean;
    href: RelativePathString | ExternalPathString;
    label: string;
    style?: object;
    variant?: LinkVariant;
    loading?: boolean;
    disabled?: boolean;
    textStyle?: object;
}

const LinkComponent = ({
    asButton = false,
    href,
    label,
    style,
    variant = "primary",
    loading = false,
    disabled = false,
}: LinkComponentProps) => {
    let [] = useFonts({
        Inter: require("../assets/fonts/InterVariable.ttf"),
    });

    if (asButton) {
        return (
            <Pressable
                style={[styles.container, styles[variant], disabled && styles.disabled, style]}
                disabled={disabled || loading}
            >
                <Link href={href}>
                    <TextComponent style={[styles.label, disabled && styles.disabledText]}>{label}</TextComponent>
                </Link>
            </Pressable>
        );
    }

    return (
        <Link
            href={href}
            style={[styles.container, variant !== "text" && styles[variant], disabled && styles.disabled, style]}
        >
            <TextComponent style={[styles.label, disabled && styles.disabledText]}>{label}</TextComponent>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        flexDirection: "row",
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        flexGrow: 0,
    },
    label: {
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        flexShrink: 0,
    },
    primary: {
        backgroundColor: "#4F46E5",
    },
    secondary: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#4F46E5",
    },
    text: {
        backgroundColor: "transparent",
        color: "#000000",
        padding: 0,
    },
    destructive: {
        backgroundColor: "#DC2626",
    },
    disabled: {
        opacity: 0.5,
    },
    primaryText: {
        color: "white",
    },
    secondaryText: {
        color: "#4F46E5",
    },
    textText: {
        color: "#4F46E5",
    },
    destructiveText: {
        color: "white",
    },
    disabledText: {
        color: "#9CA3AF",
    },
});

export default LinkComponent;
