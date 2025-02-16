import { StyleSheet } from "react-native";

const baseStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: "auto",
        width: "auto",
        justifyContent: "center",
    },
    xs: {
        padding: 6,
        borderRadius: 6,
    },
    sm: {
        padding: 8,
        borderRadius: 6,
    },
    md: {
        padding: 12,
        borderRadius: 8,
    },
    lg: {
        padding: 16,
        borderRadius: 8,
    },
    xl: {
        padding: 20,
        borderRadius: 12,
    },
    textXs: {
        fontSize: 12,
    },
    textSm: {
        fontSize: 14,
    },
    textMd: {
        fontSize: 16,
    },
    textLg: {
        fontSize: 18,
    },
    textXl: {
        fontSize: 20,
    },
    // Variants
    primary: {
        backgroundColor: "#4F46E5",
        color: "white",
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
    outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    ghost: {
        backgroundColor: "transparent",
    },
    primaryText: { color: "white" },
    secondaryText: { color: "#4F46E5" },
    textText: { color: "#4F46E5" },
    destructiveText: { color: "white" },
    outlineText: { color: "#374151" },
    ghostText: { color: "#374151" },
    disabled: {
        opacity: 0.5,
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    fullWidth: {
        width: "100%",
    },
});

export { baseStyles };
