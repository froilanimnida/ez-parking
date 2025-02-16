import React from "react";
import { View } from "react-native";
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

const LinkComponent: React.FC<LinkProps> = ({
    href,
    label,
    asChild = false,
    style,
    textStyle,
    variant = "primary",
    size = "md",
    disabled = false,
    icon,
    target = "_self",
    iconPosition = "left",
    fullWidth = false,
    children,
}) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });
    const content = children || (
        <>
            {icon && iconPosition === "left" && <View style={baseStyles.iconLeft}>{icon}</View>}
            {label && <TextComponent style={[baseStyles[`${variant}Text`], textStyle]}>{label}</TextComponent>}
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
        baseStyles.container,
        baseStyles[size],
        variant !== "text" && baseStyles[variant],
        fullWidth && baseStyles.fullWidth,
        disabled && baseStyles.disabled,
        style,
    ];

    return (
        <Link href={href} style={linkStyles} target={target}>
            {content}
        </Link>
    );
};

export default LinkComponent;
