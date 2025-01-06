import { StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
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
    icon?: React.ReactNode;
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
    icon,
}: LinkComponentProps) => {
    let [fontsLoaded] = useFonts({
        Inter: require("../assets/fonts/InterVariable.ttf"),
    });
    const content = (
        <>
            {loading ? (
                <ActivityIndicator color={variant === "secondary" ? "#4F46E5" : "white"} />
            ) : (
                <View style={styles.contentContainer}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <TextComponent style={[styles.label, disabled && styles.disabledText]}>{label}</TextComponent>
                </View>
            )}
        </>
    );

    if (asButton) {
        return (
            <Pressable
                style={[styles.container, styles[variant], disabled && styles.disabled, style]}
                disabled={disabled || loading}
            >
                <Link href={href}>{content}</Link>
            </Pressable>
        );
    }

    return (
        <Link
            href={href}
            style={[styles.container, variant !== "text" && styles[variant], disabled && styles.disabled, style]}
        >
            {content}
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
        flexShrink: 0,
        flexGrow: 0,
    },
    label: {
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        flexShrink: 0,
        color: "white",
    },
    iconContainer: {
        marginRight: 8,
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
