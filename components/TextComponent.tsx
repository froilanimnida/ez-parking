import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption" | "label";

interface TextComponentProps {
    variant?: TextVariant;
    children: React.ReactNode;
    style?: object;
    color?: string;
    bold?: boolean;
    medium?: boolean;
    numberOfLines?: number;
    align?: "left" | "center" | "right";
}

const TextComponent: React.FC<TextComponentProps> = ({
    variant = "body",
    children,
    style,
    color,
    bold = false,
    medium = false,
    numberOfLines,
    align = "left",
}) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });

    return (
        <Text
            style={[
                styles.base,
                styles[variant],
                {
                    color: color,
                    fontWeight: bold ? "700" : medium ? "500" : "400",
                    textAlign: align,
                },
                style,
            ]}
            numberOfLines={numberOfLines}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    base: {
        fontFamily: "Inter",
        width: "auto",
    },
    h1: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: "700",
    },
    h2: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "700",
    },
    h3: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "600",
    },
    h4: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "600",
    },
    h5: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
    },
    h6: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "600",
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
    },
    caption: {
        fontSize: 12,
        lineHeight: 16,
    },
    label: {
        fontSize: 14,
        lineHeight: 20,
    },
});

export default TextComponent;
