import React from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { Link, type ExternalPathString, type RelativePathString } from "expo-router";
import { BaseComponentProps } from "@/lib/types/ui";
import { baseStyles } from "@/styles/components";
import TextComponent from "./TextComponent";
import { useFonts } from "expo-font";

interface LinkProps extends BaseComponentProps {
    href: RelativePathString | ExternalPathString;
    label?: string;
    asChild?: boolean;
    target?: "_self" | "_blank";
}

const LinkComponent = ({
    href,
    label,
    asChild = false,
    style,
    textStyle,
    variant = "primary",
    disabled = false,
    icon,
    target = "_self",
    iconPosition = "left",
    children,
}: LinkProps) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });
    const content = children || (
        <>
            {icon && iconPosition === "left" && <View style={baseStyles.iconLeft}>{icon}</View>}
            {label && (
                <TextComponent bold style={[baseStyles[`${variant}Text`], textStyle]}>
                    {label}
                </TextComponent>
            )}
            {icon && iconPosition === "right" && <View style={baseStyles.iconRight}>{icon}</View>}
        </>
    );

    if (asChild) {
        return (
            <Link href={href} asChild>
                {children}
            </Link>
        );
    }

    const linkStyles = [
        {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            paddingHorizontal: 20,
            paddingVertical: 12,
        },
        variant !== "text" && baseStyles[variant],
        disabled && baseStyles.disabled,
        style,
    ];

    return (
        <Link href={href} style={linkStyles as StyleProp<TextStyle>} target={target}>
            {content}
        </Link>
    );
};

export default LinkComponent;
